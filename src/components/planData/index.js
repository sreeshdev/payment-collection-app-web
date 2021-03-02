import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Header,
  Segment,
  Loader,
  Grid,
  Divider,
  Table,
  Icon,
  Modal,
  Confirm,
  Form,
  Radio,
  Label,
} from "semantic-ui-react";
import "./index.scss";
import { auth, database } from "../../config/firebase";

const PlanData = ({ open, setOpen, selectedCompany, getCustomerList }) => {
  const [adminData, setAdminData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [newData, setNewData] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [newDate, setNewDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [confrimOpen, setConfirmOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [updateLoad, setUpdateLoad] = useState(false);
  const [countChange, setCountChange] = useState(false);

  const [countMsg, setCountMsg] = useState(null);
  const [numberPositiveMsg, setNumberPositiveMsg] = useState(3);
  useEffect(() => {
    console.log("!!", selectedCompany);
    if (open && selectedCompany) {
      setIsLoading(true);
      setIsEdit(false);
      setCountChange(false);
      setMsg(null);
      setCountMsg(null);
      setNumberPositiveMsg(3);
      setAdminData(selectedCompany);
      setNewData(selectedCompany);
      setIsLoading(false);
      // getAdminDetail();
    }
  }, [open, selectedCompany]);
  const updateCustomer = () => {
    setUpdateLoad(true);
    database
      .ref("customers/" + adminData.id)
      .set({
        office: newData.office,
        serial: newData.serial,
        no: newData.no,
        packages: newData.packages,
        amount: newData.amount,
        city: newData.city,
        locality: newData.locality,
        phone: newData.phone,
        name: newData.name,
        barCode: newData.barCode,
        isActive: newData.isActive,
      })
      .then((snapshot) => {
        setUpdateLoad(false);
        setAdminData(newData);
        getCustomerList();
        setIsEdit(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteCustomer = () => {
    setUpdateLoad(true);
    database
      .ref("customers/" + adminData.id)
      .remove()
      .then(() => {
        setUpdateLoad(false);
      });
  };
  const onCloseModal = () => {
    setAdminData(null);
    setIsEdit(false);
    setOpen(false);
    setIsLoading(true);
    setMsg(null);
  };
  const handleInputChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };
  console.log("@@", newData);
  return isLoading ? (
    <Segment.Group className="loader-Container">
      <Loader active inline="centered" />
    </Segment.Group>
  ) : (
    <div>
      <Segment.Group style={{ margin: "10px", minHeight: "60vh" }}>
        <div className="close-but">
          <button
            className="edit-but"
            onClick={() => {
              setIsEdit(!isEdit);
            }}
          >
            {isEdit ? "Cancel" : "Edit"}
          </button>
          <Icon
            name="close"
            onClick={onCloseModal}
            style={{ cursor: "pointer" }}
          />
        </div>
        {adminData ? (
          <Grid columns={2}>
            <Grid.Column>
              <Table
                basic="very"
                celled
                collapsing
                style={{ marginLeft: "60px" }}
              >
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4">
                        <Header.Content>Barcode No.</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {isEdit ? (
                        <input
                          value={newData.barCode}
                          name="barCode"
                          onChange={(e) => handleInputChange(e)}
                        />
                      ) : (
                        <Header as="h5">
                          <Header.Content className="tableData">
                            {adminData?.barCode}
                          </Header.Content>
                        </Header>
                      )}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4">
                        <Header.Content>Customer Name</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {isEdit ? (
                        <input
                          value={newData.name}
                          name="name"
                          onChange={(e) => handleInputChange(e)}
                        />
                      ) : (
                        <Header as="h5">
                          <Header.Content className="tableData">
                            {adminData?.name}
                          </Header.Content>
                        </Header>
                      )}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4">
                        <Header.Content>Phone</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {isEdit ? (
                        <input
                          value={newData.phone}
                          name="phone"
                          onChange={(e) => handleInputChange(e)}
                        />
                      ) : (
                        <Header as="h5">
                          <Header.Content className="tableData">
                            {adminData?.phone}
                          </Header.Content>
                        </Header>
                      )}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4">
                        <Header.Content>Locality</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {isEdit ? (
                        <input
                          value={newData.locality}
                          name="locality"
                          onChange={(e) => handleInputChange(e)}
                        />
                      ) : (
                        <Header as="h5">
                          <Header.Content className="tableData">
                            {adminData?.locality}
                          </Header.Content>
                        </Header>
                      )}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4">
                        <Header.Content>City</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {isEdit ? (
                        <input
                          value={newData.city}
                          name="city"
                          onChange={(e) => handleInputChange(e)}
                        />
                      ) : (
                        <Header as="h5">
                          <Header.Content className="tableData">
                            {adminData?.city}
                          </Header.Content>
                        </Header>
                      )}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4">
                        <Header.Content>Office</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {isEdit ? (
                        <input
                          value={newData.office}
                          name="office"
                          onChange={(e) => handleInputChange(e)}
                        />
                      ) : (
                        <Header as="h5">
                          <Header.Content className="tableData">
                            {adminData?.office}
                          </Header.Content>
                        </Header>
                      )}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row rowSpan="4">
                    <Table.Cell>
                      <Header as="h4">
                        <Header.Content>No</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {isEdit ? (
                        <input
                          value={newData.no}
                          name="no"
                          onChange={(e) => handleInputChange(e)}
                        />
                      ) : (
                        <Header as="h5">
                          <Header.Content className="tableData">
                            {adminData?.no}
                          </Header.Content>
                        </Header>
                      )}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row rowSpan="4">
                    <Table.Cell>
                      <Header as="h4">
                        <Header.Content>Serial</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {isEdit ? (
                        <input
                          value={newData.serial}
                          name="serial"
                          onChange={(e) => handleInputChange(e)}
                        />
                      ) : (
                        <Header as="h5">
                          <Header.Content className="tableData">
                            {adminData?.serial}
                          </Header.Content>
                        </Header>
                      )}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column className="flexEnd">
              <div className="update-but">
                {msg && (
                  <span
                    style={
                      msg === 1
                        ? { color: "green" }
                        : msg === 2
                        ? { color: "blue" }
                        : { color: "red" }
                    }
                  >
                    {msg === 1
                      ? "Success!"
                      : msg === 2
                      ? "No Change to Update"
                      : "Fail!"}
                  </span>
                )}
                {isEdit && (
                  <>
                    <Button
                      color="red"
                      disabled={adminData.expireDate !== newDate ? false : true}
                      onClick={() => {
                        setConfirmDelete(true);
                      }}
                      loading={updateLoad ? true : false}
                    >
                      Delete
                    </Button>
                    <Button
                      color="blue"
                      disabled={adminData.expireDate !== newDate ? false : true}
                      onClick={() => {
                        setConfirmOpen(true);
                      }}
                      loading={updateLoad ? true : false}
                    >
                      Update
                    </Button>
                  </>
                )}
              </div>
            </Grid.Column>
          </Grid>
        ) : (
          <div className="noDataContent">
            <h3>Customer Name: {selectedCompany?.name}</h3>
            <h4>Customer Data Not Available</h4>
          </div>
        )}

        {adminData && <Divider vertical></Divider>}
      </Segment.Group>
      <Confirm
        open={confrimOpen}
        content="Are You Sure To Update?"
        cancelButton="No"
        confirmButton="Yes, Update"
        onCancel={() => {
          setConfirmOpen(false);
        }}
        onConfirm={() => {
          updateCustomer();
          setConfirmOpen(false);
        }}
        size="mini"
      />
      <Confirm
        open={confirmDelete}
        content="Are You Sure To Delete this Customer?"
        cancelButton="No"
        confirmButton="Yes, Delete"
        onCancel={() => {
          setConfirmDelete(false);
        }}
        onConfirm={() => {
          deleteCustomer();
          setConfirmDelete(false);
        }}
        size="mini"
      />
    </div>
  );
};

export default PlanData;
