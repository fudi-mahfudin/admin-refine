import { Button, Form, Space } from "antd";
import { useForm } from "@refinedev/antd";
import { HttpError } from "@refinedev/core";
import { GetFields, GetVariables } from "@refinedev/nestjs-query";
import MDEditor from "@uiw/react-md-editor";
import { UPDATE_TASK_MUTATION } from "@/graphql/mutations";
import { Task } from "@/graphql/schema.types";
import {
  UpdateTaskMutation,
  UpdateTaskMutationVariables,
} from "@/graphql/types";

type Props = {
  initialValues: {
    description?: Task["description"];
  };
  cancelForm: () => void;
};

export const DescriptionForm = ({ initialValues, cancelForm }: Props) => {
  // use the useForm hook to manage the form
  // formProps contains all the props that we need to pass to the form (initialValues, onSubmit, etc.)
  // saveButtonProps contains all the props that we need to pass to the save button
  const { formProps, saveButtonProps } = useForm<
    GetFields<UpdateTaskMutation>,
    HttpError,
    Pick<GetVariables<UpdateTaskMutationVariables>, "description">
  >({
    queryOptions: { enabled: false },
    redirect: false,
    onMutationSuccess: () => {
      cancelForm();
    },
    meta: { gqlMutation: UPDATE_TASK_MUTATION },
  });

  return (
    <>
      <Form {...formProps} initialValues={initialValues}>
        <Form.Item noStyle name="description">
          <MDEditor preview="edit" data-color-mode="light" height={250} />
        </Form.Item>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            marginTop: "12px",
          }}
        >
          <Space>
            <Button type="default" onClick={cancelForm}>
              Cancel
            </Button>
            <Button {...saveButtonProps} type="primary">
              Save
            </Button>
          </Space>
        </div>
      </Form>
    </>
  );
};
