import { LogoMe } from "@/components";
import { AuthPage, ThemedTitleV2 } from "@refinedev/antd";

export const ForgotPassword = () => {
  return (
    <AuthPage
      type="forgotPassword"
      title={
        <ThemedTitleV2
          icon={<LogoMe size={24} />}
          collapsed={false}
          text="Admin Refine"
        />
      }
    />
  );
};
