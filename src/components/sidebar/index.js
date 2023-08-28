import React from "react";
import "./index.scss";
import { List, Loader, Input, Label, Icon } from "semantic-ui-react";

const SideBar = ({
  companyList,
  setCompany,
  setSearchValue,
  searchCompany,
  clearSearch,
  searchValue,
}) => {
  return (
    <div className="sidebar">
      <div className="searchBox">
        <div className="input-box">
          <div className="box-content">
            <Icon name="search" className="icon-s" />
            <input
              type="text"
              placeholder="Search Customer By Name/Phone"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={(e) => searchCompany(e)}
            />
            {searchValue && (
              <Icon name="close" className="icon-x" onClick={clearSearch} />
            )}
          </div>
        </div>
        <button
          class="ui labeled icon primary button"
          style={{ marginTop: "10px" }}
          onClick={() => setCompany({}, true)}
        >
          <i class="add icon"></i>
          Add Customer
        </button>
        {/* <Input
          className="input-box"
          icon="search"
          iconPosition="left"
          placeholder="Search Company"
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={(e) => searchCompany(e)}
        />
        <Icon name="close" /> */}
      </div>
      {companyList && companyList?.length > 0 ? (
        <List divided selection size="big">
          {companyList?.map((company, i) => {
            return (
              <List.Item
                key={i}
                onClick={() => setCompany(company)}
                style={{ paddingLeft: "25px" }}
              >
                <List.Content className="list-content">
                  <div className="listHead">
                    {company.barCode} - {company.name}
                  </div>

                  {company?.admin?.plan?.planName && (
                    <Label color="blue" size="mini" className="label">
                      {company?.admin?.plan?.planName}
                    </Label>
                  )}
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      ) : companyList?.length === 0 ? (
        <div className="loader-Container">No Company Found</div>
      ) : (
        <div className="loader-Container">
          <Loader active inline="centered" />
        </div>
      )}
    </div>
  );
};

export default SideBar;
