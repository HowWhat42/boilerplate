import { getRouter } from "@/router";
import { queryClient, tuyau } from "@/lib/tuyau";
import { toast } from "sonner";
import { getCurrentUserQueryOptions } from "./users";

export const loginMutationOptions = tuyau.login.$post.mutationOptions({
  onSuccess: async () => {
    void queryClient.invalidateQueries({
      queryKey: getCurrentUserQueryOptions().queryKey,
    });
    void getRouter( ).invalidate();
  },
  onError: async (error) => {
    if (error instanceof Error) {
      toast.error("Identifiants incorrects", {
        description: "Veuillez vérifier vos identifiants ou créer un compte",
      });
    } else {
      toast.error("Une erreur est survenue");
    }
  },
});

export const logoutMutationOptions = tuyau.logout.$post.mutationOptions({
  onSettled: () => {
    toast.success("Déconnexion réussie");
    void getRouter().navigate({ to: "/auth/login" });
    queryClient.removeQueries({
      queryKey: getCurrentUserQueryOptions().queryKey,
    });
  },
});

export const forgotPasswordMutationOptions = () =>
  tuyau.auth.password.forgot.$post.mutationOptions({
    onSuccess: async () => {
      toast.success(
        "Si un compte existe avec cet email, vous allez recevoir un email pour réinitialiser votre mot de passe.",
      );
      void getRouter().navigate({ to: "/auth/login" });
    },
  });

export const resetPasswordMutationOptions = (token: string) =>
  tuyau.auth.password.reset({ token }).$post.mutationOptions({
    onSuccess: async () => {
      toast.success("Mot de passe mis à jour");
    },
  });