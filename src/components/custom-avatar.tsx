import { getNameInitials } from "@/utilities";
import { Avatar as AntAvatar, AvatarProps } from "antd";

type Props = AvatarProps & {
  name?: string;
};

export const CustomAvatar = ({ name, style, ...rest }: Props) => {
  return (
    <AntAvatar
      alt={name}
      size="small"
      style={{
        backgroundColor: "#87d068",
        display: "flex",
        alignItems: "center",
        border: "none",
        ...style,
      }}
      {...rest}
    >
      {getNameInitials(name || "")}
    </AntAvatar>
  );
};
