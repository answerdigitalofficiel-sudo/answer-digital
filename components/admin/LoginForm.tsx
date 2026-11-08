"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, TriangleAlert } from "lucide-react";
import { login, type LoginState } from "@/app/admin/actions";

const initialState: LoginState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary w-full disabled:opacity-70">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Connexion…
        </>
      ) : (
        "Se connecter"
      )}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <div role="alert" className="flex gap-3 rounded-xl border border-red-400/40 bg-red-400/10 p-4 text-sm text-red-200">
          <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
          <p>{state.error}</p>
        </div>
      )}
      <div>
        <label htmlFor="email" className="label">Adresse électronique</label>
        <input id="email" name="email" type="email" autoComplete="username" required className="input" />
      </div>
      <div>
        <label htmlFor="password" className="label">Mot de passe</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className="input" />
      </div>
      <SubmitButton />
    </form>
  );
}
