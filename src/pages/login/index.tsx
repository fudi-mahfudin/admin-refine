import { AuthPage, ThemedTitleV2 } from "@refinedev/antd";
import { authCredentials } from "../../providers";
import { LogoMe } from "@/components";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues: authCredentials,
      }}
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
