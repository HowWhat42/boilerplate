import { toast } from "sonner";
import { getCurrentUserQueryOptions } from "./users";
import { getRouter } from "@/router";
import { queryClient, tuyau } from "@/lib/tuyau";
import { localizedNavigate } from "@/lib/localized-navigate";

export const loginMutationOptions = tuyau.login.$post.mutationOptions({
  onSuccess: async () => {
    await queryClient.invalidateQueries({
      queryKey: getCurrentUserQueryOptions().queryKey,
    });
    await getRouter().invalidate();
  },
  onError: (error) => {
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
    void localizedNavigate({ to: "/auth/login" });
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
      await localizedNavigate({ to: "/auth/login" });
    },
  });

export const resetPasswordMutationOptions = (token: string) =>
  tuyau.auth.password.reset({ token }).$post.mutationOptions({
    onSuccess: () => {
      toast.success("Password updated");
    },
  });

export const verifyEmailMutationOptions = (token: string) =>
  tuyau.auth.email.verify({ token }).$post.mutationOptions({
    onSuccess: () => {
      toast.success("Email verified successfully", {
        description: "You can now log in to your account.",
      });
    },
    onError: (error) => {
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
    onSuccess: () => {
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
      await localizedNavigate({ to: "/auth/login" });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error("Registration failed", {
          description: "Please check your information and try again.",
        });
      } else {
        toast.error("An error occurred during registration");
      }
    },
  });