import React from "react";
import { getDefaultFilter, useGo } from "@refinedev/core";
import { Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  CreateButton,
  DeleteButton,
  EditButton,
  FilterDropdown,
  List,
  useTable,
} from "@refinedev/antd";
import { Text } from "@/components/text";
import { COMPANIES_LIST_QUERY } from "@/graphql/queries";
import { Company } from "@/graphql/schema.types";
import { currencyNumber } from "@/utilities/currency-number";
import { CustomAvatar } from "@/components/custom-avatar";

export const CompanyList = ({ children }: React.PropsWithChildren) => {
  const go = useGo();
  const { tableProps, filters } = useTable({
    resource: "companies",
    // onSearch: (values) => {
    //   return [{ field: "name", operator: "contains", value: values.name }];
    // },
    pagination: { pageSize: 20 },
    sorters: { initial: [{ field: "createdAt", order: "desc" }] },
    filters: {
      initial: [{ field: "name", operator: "contains", value: undefined }],
    },
    meta: { gqlQuery: COMPANIES_LIST_QUERY },
  });

  return (
    <>
      <List
        breadcrumb={false}
        headerButtons={
          <CreateButton
            onClick={() =>
              go({
                to: { resource: "companies", action: "create" },
                options: { keepQuery: true },
                type: "replace",
              })
            }
          />
        }
      >
        <Table {...tableProps} pagination={{ ...tableProps.pagination }}>
          <Table.Column<Company>
            dataIndex="name"
            title="Company Title"
            defaultFilteredValue={getDefaultFilter("id", filters)}
            filterIcon={<SearchOutlined />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Search Company" />
              </FilterDropdown>
            )}
            render={(value, company) => (
              <Space>
                <CustomAvatar
                  shape="square"
                  name={company.name}
                  src={company.avatarUrl}
                />
                <Text style={{ whiteSpace: "nowrap" }}>{company.name}</Text>
              </Space>
            )}
          />
          <Table.Column<Company>
            dataIndex="totalRevenue"
            title="Open deals amount"
            align="end"
            render={(value, company) => (
              <Text style={{ whiteSpace: "nowrap" }}>
                {currencyNumber(company?.dealsAggregate?.[0].sum?.value || 0)}
              </Text>
            )}
          />
          <Table.Column<Company>
            dataIndex="id"
            title="Actions"
            fixed="right"
            render={(value) => (
              <Space>
                <EditButton hideText size="small" recordItemId={value} />
                <DeleteButton hideText size="small" recordItemId={value} />
              </Space>
            )}
          />
        </Table>
      </List>
      {children}
    </>
  );
};
