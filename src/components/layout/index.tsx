import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";
import { Header } from "./header";
import { LogoMe } from "../icons/logo-me";

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemedLayoutV2
      Header={Header}
      Title={(titleProps) => (
        <ThemedTitleV2 {...titleProps} text="Admin Refine" icon={<LogoMe />} />
      )}
    >
      {children}
    </ThemedLayoutV2>
  );
};
