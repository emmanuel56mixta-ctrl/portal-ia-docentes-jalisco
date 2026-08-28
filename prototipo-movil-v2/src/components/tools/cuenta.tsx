import type { FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/input";
import { CAMPOS, FASES } from "@/lib/content";
import { useAppStore } from "@/lib/store";

export function CuentaTool() {
  const profile = useAppStore((s) => s.profile);
  const setProfile = useAppStore((s) => s.setProfile);
  const complete = useAppStore((s) => s.completeStep);
  const navigate = useNavigate();

  function save(e: FormEvent) {
    e.preventDefault();
    setProfile({ onboarded: true });
    complete("cuenta");
    toast.success("Perfil guardado en este dispositivo");
    navigate({ to: "/ruta" });
  }

  return (
    <form onSubmit={save} className="space-y-3.5">
      <p className="text-sm leading-relaxed text-muted">
        En la versión institucional esto se liga a @jaliscoedu.mx. Aquí el perfil vive en tu
        dispositivo y personaliza planeaciones y gemas.
      </p>
      <div>
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          value={profile.name}
          onChange={(e) => setProfile({ name: e.target.value })}
          placeholder="Ej. Mariana López"
          required
        />
      </div>
      <div>
        <Label htmlFor="school">Escuela</Label>
        <Input
          id="school"
          value={profile.school}
          onChange={(e) => setProfile({ school: e.target.value })}
          placeholder="Nombre de la escuela"
        />
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <Label htmlFor="cct">CCT</Label>
          <Input
            id="cct"
            value={profile.cct}
            onChange={(e) => setProfile({ cct: e.target.value })}
            placeholder="14DPR…"
          />
        </div>
        <div>
          <Label htmlFor="zona">Zona</Label>
          <Input
            id="zona"
            value={profile.zona}
            onChange={(e) => setProfile({ zona: e.target.value })}
            placeholder="Zona escolar"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="fase">Fase</Label>
        <Select
          id="fase"
          value={profile.fase}
          onChange={(e) => setProfile({ fase: e.target.value })}
        >
          {FASES.map((f) => (
            <option key={f.id} value={f.id}>
              {f.label}
            </option>
          ))}
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <Label htmlFor="grupo">Grupo</Label>
          <Input
            id="grupo"
            value={profile.grupo}
            onChange={(e) => setProfile({ grupo: e.target.value })}
            placeholder="5.° A"
          />
        </div>
        <div>
          <Label htmlFor="campo">Campo</Label>
          <Select
            id="campo"
            value={profile.campo}
            onChange={(e) => setProfile({ campo: e.target.value })}
          >
            {CAMPOS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <Button type="submit" className="mt-2 w-full" size="lg">
        Guardar y continuar
      </Button>
    </form>
  );
}
