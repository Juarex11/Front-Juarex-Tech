import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export function PlaygroundPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Design System Playground
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Página de desarrollo para validar los componentes reutilizables de la aplicación.
          </p>
        </header>

        <div className="space-y-8">
          <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-foreground">Button</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Variantes, tamaños y estados disponibles.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-medium text-foreground">Variantes</h3>

                <div className="flex flex-wrap gap-3">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium text-foreground">Tamaños</h3>

                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium text-foreground">Estados</h3>

                <div className="flex flex-wrap gap-3">
                  <Button>Normal</Button>
                  <Button disabled>Disabled</Button>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-foreground">Input</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Estados y configuraciones básicas del campo de entrada.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="playground-name">Nombre</Label>
                <Input id="playground-name" placeholder="Ingresa tu nombre" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="playground-email">Correo electrónico</Label>
                <Input id="playground-email" type="email" placeholder="correo@ejemplo.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="playground-disabled">Deshabilitado</Label>
                <Input id="playground-disabled" placeholder="Campo deshabilitado" disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="playground-password">Contraseña</Label>
                <Input
                  id="playground-password"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="playground-input-invalid">Campo inválido</Label>

              <Input
                id="playground-input-invalid"
                aria-invalid="true"
                defaultValue="correo-invalido"
              />

              <p className="text-sm text-destructive">
                Ingresa una dirección de correo electrónico válida.
              </p>
            </div>
          </section>

          <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-foreground">Textarea</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Campos para textos largos y descripciones.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="playground-description">Descripción</Label>
              <Textarea id="playground-description" placeholder="Escribe una descripción..." />
            </div>
          </section>

          <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-foreground">Card</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Contenedor reutilizable para agrupar información relacionada.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Proyecto de ejemplo</CardTitle>
                <CardDescription>Información básica de un proyecto.</CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Este contenido representa información que posteriormente podría mostrarse dentro
                  de una tarjeta del sistema.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-foreground">Badge</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Indicadores para estados, categorías y etiquetas.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </section>

          <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-foreground">Select</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Selector para opciones predefinidas.
              </p>
            </div>

            <div className="max-w-md space-y-2">
              <Label htmlFor="playground-status">Estado del proyecto</Label>

              <Select>
                <SelectTrigger id="playground-status">
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="in-progress">En curso</SelectItem>
                  <SelectItem value="review">En revisión</SelectItem>
                  <SelectItem value="completed">Completado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>

          <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-foreground">Checkbox</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Opciones que pueden activarse individualmente.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="playground-notifications" />

              <Label htmlFor="playground-notifications">Recibir notificaciones</Label>
            </div>
          </section>

          <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-foreground">Switch</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Control para activar o desactivar una configuración.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Switch id="playground-active" />

              <Label htmlFor="playground-active">Proyecto activo</Label>
            </div>
          </section>

          <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-foreground">Field</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Estructura reutilizable para campos de formularios.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="playground-field-basic">Campo básico</FieldLabel>

                <Input id="playground-field-basic" placeholder="Ingresa un valor" />
              </Field>

              <Field>
                <FieldLabel htmlFor="playground-field-required">
                  Campo requerido <span className="text-destructive">*</span>
                </FieldLabel>

                <Input
                  id="playground-field-required"
                  placeholder="Este campo es obligatorio"
                  required
                />

                <FieldDescription>Este campo debe ser completado.</FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="playground-field-description">
                  Campo con descripción
                </FieldLabel>

                <Input id="playground-field-description" placeholder="Ingresa tu correo" />

                <FieldDescription>
                  Usaremos este correo para enviarte notificaciones.
                </FieldDescription>
              </Field>

              <Field data-invalid>
                <FieldLabel htmlFor="playground-field-error">Campo inválido</FieldLabel>

                <Input id="playground-field-error" aria-invalid defaultValue="correo-invalido" />

                <FieldError>Ingresa una dirección de correo electrónico válida.</FieldError>
              </Field>
            </div>
          </section>

          <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-foreground">Separator</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Separadores para dividir visualmente contenido relacionado.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Horizontal</p>

                <Separator />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Vertical</p>

                <div className="flex h-12 items-center gap-4">
                  <span className="text-sm text-foreground">Contenido izquierdo</span>

                  <Separator orientation="vertical" />

                  <span className="text-sm text-foreground">Contenido derecho</span>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-foreground">Label</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Asociación entre etiquetas y campos de formulario.
              </p>
            </div>

            <div className="max-w-md space-y-2">
              <Label htmlFor="playground-label-example">Campo de ejemplo</Label>

              <Input id="playground-label-example" placeholder="Escribe algo..." />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
