<?php
/**
 * Plugin Name: Docente IA · Contador agregado
 * Description: Conteos diarios del Constructor, sin identificadores de visitantes. Activación y prueba a cargo de DTI.
 * Version: 0.2.0
 * Requires PHP: 7.4
 */
defined('ABSPATH') || exit;

function dia_count_install_access() {
    // Consulta propia; no concede edición, configuración ni gestión de usuarios.
    $viewer = get_role('dia_metrics_viewer');
    if (!$viewer) {
        add_role('dia_metrics_viewer', 'Consulta de métricas Docente IA', array(
            'read' => true,
            'dia_view_metrics' => true,
        ));
    } else {
        $viewer->add_cap('dia_view_metrics');
    }
    $admin = get_role('administrator');
    if ($admin) $admin->add_cap('dia_view_metrics');
    update_option('dia_count_access_version', '1', false);
}
// La actualización de un plugin activo no ejecuta de nuevo su activación.
add_action('plugins_loaded', function() {
    if (get_option('dia_count_access_version') !== '1') dia_count_install_access();
});

function dia_count_install() {
    global $wpdb;
    $table = $wpdb->prefix . 'dia_usage_daily';
    $charset = $wpdb->get_charset_collate();
    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta("CREATE TABLE $table (
      day date NOT NULL,
      event varchar(24) NOT NULL,
      section varchar(24) NOT NULL DEFAULT '',
      constructor varchar(24) NOT NULL DEFAULT '',
      stage tinyint unsigned NOT NULL DEFAULT 0,
      role varchar(16) NOT NULL DEFAULT '',
      total bigint unsigned NOT NULL DEFAULT 0,
      PRIMARY KEY  (day,event,section,constructor,stage,role)
    ) $charset;");
    dia_count_install_access();
}
register_activation_hook(__FILE__, 'dia_count_install');

function dia_count_allowed_origin($request) {
    // Escritura pública de contadores; solo desde el origen del WordPress instalado.
    // No es autenticación ni protección contra bots que falsifiquen Origin.
    $parts = wp_parse_url(home_url('/'));
    $expected = $parts['scheme'] . '://' . $parts['host'] . (isset($parts['port']) ? ':' . $parts['port'] : '');
    return hash_equals($expected, rtrim((string) $request->get_header('origin'), '/'));
}
function dia_count_record($request) {
    if (strlen($request->get_body()) > 512 || stripos((string)$request->get_header('content-type'), 'application/json') !== 0) {
        return new WP_Error('invalid_payload', 'Formato no admitido.', array('status'=>400));
    }
    $p = $request->get_json_params();
    $keys = array('event','section','constructor','stage','role');
    if (!is_array($p) || count($p)!==5 || array_diff(array_keys($p), $keys)) {
        return new WP_Error('invalid_fields', 'Campos no admitidos.', array('status'=>400));
    }
    foreach (array('event','section','constructor','role') as $key) {
        if (!is_string($p[$key])) return new WP_Error('invalid_type', 'Tipo no admitido.', array('status'=>400));
    }
    $map = array('inicial'=>array('docente','gestion','atp'),'especial'=>array('docente','gestion','atp'),
      'indigena'=>array('docente','gestion','atp'),'fisica'=>array('fisica','gestion','atp'),
      'preescolar'=>array('docente','gestion','atp'),'primaria'=>array('docente','multigrado','gestion','atp'),
      'secundaria'=>array('docente','telesecundaria','gestion','atp'),'media-superior'=>array('docente','gestion','atp'));
    $event=$p['event']; $section=$p['section']; $constructor=$p['constructor']; $stage=$p['stage']; $role=$p['role'];
    $valid=false;
    if ($event==='page_view') $valid=($section==='' && $constructor==='' && $stage===0 && $role==='');
    elseif ($event==='section_open') $valid=(($section==='integral' || isset($map[$section])) && $constructor==='' && $stage===0 && $role==='');
    elseif (in_array($event,array('constructor_open','stage_select','role_select','gem_open'),true)) {
        $valid=isset($map[$section]) && in_array($constructor,$map[$section],true) && is_int($stage) && $stage>=1 && $stage<=4;
        $valid=$valid && ($constructor==='gestion' ? in_array($role,array('direccion','supervision','sector'),true) : $role==='');
        if ($event==='role_select') $valid=$valid && $constructor==='gestion';
    }
    if (!$valid) return new WP_Error('invalid_event', 'Evento no admitido.', array('status'=>400));
    global $wpdb;
    $table=$wpdb->prefix . 'dia_usage_daily';
    $day=current_datetime()->format('Y-m-d');
    $result=$wpdb->query($wpdb->prepare("INSERT INTO $table (day,event,section,constructor,stage,role,total) VALUES (%s,%s,%s,%s,%d,%s,1) ON DUPLICATE KEY UPDATE total=total+1",$day,$event,$section,$constructor,$stage,$role));
    if ($result===false) return new WP_Error('storage_error','No se pudo registrar.',array('status'=>503));
    return new WP_REST_Response(null,204,array('Cache-Control'=>'no-store'));
}
add_action('rest_api_init', function() {
    register_rest_route('docente-ia/v1','/event',array('methods'=>'POST','callback'=>'dia_count_record','permission_callback'=>'dia_count_allowed_origin'));
});

function dia_count_report() {
    if (!current_user_can('dia_view_metrics')) {
        wp_die('Tu cuenta no tiene permiso para consultar estas métricas.', 'Acceso restringido', array('response'=>403));
    }
    global $wpdb;
    $table=$wpdb->prefix . 'dia_usage_daily';
    $since=current_datetime()->modify('-29 days')->format('Y-m-d');
    $rows=$wpdb->get_results($wpdb->prepare("SELECT event,section,constructor,stage,role,SUM(total) AS total FROM $table WHERE day>=%s GROUP BY event,section,constructor,stage,role ORDER BY event,section,constructor,stage,role",$since),ARRAY_A);
    echo '<div class="wrap"><h1>Uso del Constructor · últimos 30 días</h1><p>Cuenta visitas y acciones, no personas únicas ni trabajo realizado dentro de Gemini. Las recargas cuentan como visitas. Horario: el configurado en WordPress.</p>';
    if (!$rows) { echo '<p>Aún no hay eventos registrados.</p></div>';return; }
    echo '<table class="widefat striped"><thead><tr><th>Evento</th><th>Nivel/área</th><th>Constructor</th><th>Etapa</th><th>Función</th><th>Total</th></tr></thead><tbody>';
    foreach($rows as $row) {echo '<tr>';foreach(array('event','section','constructor','stage','role','total') as $key) echo '<td>'.esc_html($row[$key]).'</td>';echo '</tr>';}
    echo '</tbody></table><p>El módulo no almacena IP, nombres, correos, cookies, texto libre ni identificadores de visitantes. Los registros técnicos del servidor se administran por separado.</p></div>';
}
add_action('admin_menu', function() {
    add_menu_page('Uso del Constructor', 'Métricas Docente IA', 'dia_view_metrics', 'dia-usage', 'dia_count_report', 'dashicons-chart-bar', 3);
});
add_filter('login_redirect', function($redirect_to, $requested_redirect_to, $user) {
    if ($user instanceof WP_User && in_array('dia_metrics_viewer', $user->roles, true)
        && user_can($user, 'dia_view_metrics') && !user_can($user, 'manage_options')) {
        return admin_url('admin.php?page=dia-usage');
    }
    return $redirect_to;
}, 10, 3);
