import { getRouter } from "@/router";
import { queryClient, tuyau } from "@/lib/tuyau";
import { toast } from "sonner";
import { getCurrentUserQueryOptions } from "./users";

export const loginMutationOptions = tuyau.login.$post.mutationOptions({
  onSuccess: async () => {
    void queryClient.invalidateQueries({
      queryKey: getCurrentUserQueryOptions().queryKey,
    });
    void getRouter().invalidate();
  },
  onError: async (error) => {
    if (error instanceof Error) {
      toast.error("Identifiants incorrects", {
        description: "Please check your credentials or create an account",
      });
    } else {
      toast.error("An error occurred");
    }
  },
});

export const logoutMutationOptions = tuyau.logout.$post.mutationOptions({
  onSettled: () => {
    toast.success("Logout successful");
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
        "If an account exists with that email, you will receive an email to reset your password.",
      );
      void getRouter().navigate({ to: "/auth/login" });
    },
  });

export const resetPasswordMutationOptions = (token: string) =>
  tuyau.auth.password.reset({ token }).$post.mutationOptions({
    onSuccess: async () => {
      toast.success("Password updated");
    },
  });

export const verifyEmailMutationOptions = (token: string) =>
  tuyau.auth.email.verify({ token }).$post.mutationOptions({
    onSuccess: async () => {
      toast.success("Email verified successfully", {
        description: "You can now log in to your account.",
      });
    },
    onError: async (error) => {
      if (error instanceof Error) {
        toast.error("Verification failed", {
          description: "The verification link is invalid or has expired.",
        });
      } else {
        toast.error("An error occurred during verification.");
      }
    },
  });

export const resendVerificationMutationOptions = () =>
  tuyau.auth.email.resend.$post.mutationOptions({
    onSuccess: async () => {
      toast.success(
        "If an account exists with that email, we have sent a verification email.",
      );
    },
  });

export const registerMutationOptions = () =>
  tuyau.register.$post.mutationOptions({
    onSuccess: async () => {
      toast.success("Registration successful", {
        description: "Please check your email to verify your account.",
      });
      void getRouter().navigate({ to: "/auth/login" });
    },
    onError: async (error) => {
      if (error instanceof Error) {
        toast.error("Registration failed", {
          description: "Please check your information and try again.",
        });
      } else {
        toast.error("An error occurred during registration");
      }
    },
  });