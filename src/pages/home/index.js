import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import MenuBar from "../../components/menubar";
import { database } from "../../config/firebase";
import "./styles.scss";
import { Loader } from "semantic-ui-react";
const Home = () => {
  const [loader, setLoader] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [totalCustomer, setTotalCustomer] = useState("");
  const [totalEmployee, setTotalEmployee] = useState("");
  const [activeCustomer, setActiveCustomer] = useState("");
  const [inActiveCustomer, setInActiveCustomer] = useState("");
  const [monthlyCollection, setMonthlyCollection] = useState("");
  const [todayCollection, setTodayCollection] = useState("");
  const [employeeMonthCollection, setEmployeeMonthCollection] = useState("");
  const [employeeTodayCollection, setEmployeeTodayCollection] = useState("");
  const [employeeTodayCollectionAmount, setEmployeeTodayCollectionAmount] =
    useState("");
  useEffect(() => {
    setLoader(true);
    getData();
  }, []);
  const getData = async () => {
    try {
      const value = await localStorage.getItem("token");
      if (value !== null) {
        database
          .ref("employees/" + value)
          .once("value")
          .then((snapshot) => {
            setCurrentUser(snapshot.val());
            if (snapshot.val().isAdmin) {
              getTotalCustomer();
              getTotalEmployee();
              getActiveCustomer();
              getInActiveCustomer();
              getMonthlyCollection();
              getTodayCollection();
            } else {
              getEmployeeMonthCollection(value);
              getEmployeeTodayCollection(value);
            }
          });
      }
    } catch (e) {
      // error reading value
    }
  };
  const getTotalCustomer = async () => {
    await database
      .ref("customers/")
      .once("value")
      .then((snapshot) => {
        setTotalCustomer(snapshot.numChildren());
      });
  };
  const getActiveCustomer = async () => {
    await database
      .ref("customers/")
      .orderByChild("isActive")
      .equalTo(true)
      .once("value")
      .then((snapshot) => {
        setActiveCustomer(snapshot.numChildren());
      });
  };
  const getInActiveCustomer = async () => {
    await database
      .ref("customers/")
      .orderByChild("isActive")
      .equalTo(false)
      .once("value")
      .then((snapshot) => {
        setInActiveCustomer(snapshot.numChildren());
      });
  };
  const getTotalEmployee = async () => {
    await database
      .ref("employees/")
      .once("value")
      .then((snapshot) => {
        setTotalEmployee(snapshot.numChildren());
      });
  };
  const getMonthlyCollection = async () => {
    var count = 0;
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    var firstDay = new Date(y, m, 1).getTime();
    var lastDay = new Date(y, m + 1, 0).getTime();
    await database
      .ref("paymentCollections/")
      .once("value")
      .then((snapshot) => {
        snapshot.val() &&
          snapshot.forEach((child) => {
            if (
              child.val().collectedOn >= firstDay &&
              child.val().collectedOn <= lastDay
            ) {
              count++;
            }
          });
        setMonthlyCollection(count);
      });
  };
  const getEmployeeMonthCollection = async (value) => {
    var count = 0;
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    var firstDay = new Date(y, m, 1).getTime();
    var lastDay = new Date(y, m + 1, 0).getTime();
    await database
      .ref("paymentCollections/")
      .orderByChild("collectionBy")
      .equalTo(value)
      .once("value")
      .then((snapshot) => {
        snapshot.val() &&
          snapshot.forEach((child) => {
            if (
              child.val().collectedOn >= firstDay &&
              child.val().collectedOn <= lastDay
            ) {
              count++;
            }
          });
        setEmployeeMonthCollection(count);
      });
  };
  const getTodayCollection = async () => {
    var count = 0;
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth(),
      d = date.getDate();
    var firstDay = new Date(y, m, d).getTime();
    var lastDay = new Date(y, m, d + 1).getTime();
    await database
      .ref("paymentCollections/")
      .once("value")
      .then((snapshot) => {
        snapshot.val() &&
          snapshot.forEach((child) => {
            if (
              child.val().collectedOn >= firstDay &&
              child.val().collectedOn <= lastDay
            ) {
              count++;
            }
          });
        setTodayCollection(count);
        setLoader(false);
      });
  };
  const getEmployeeTodayCollection = async (value) => {
    var count = 0;
    var TodayAmount = 0;
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth(),
      d = date.getDate();
    var firstDay = new Date(y, m, d).getTime();
    var lastDay = new Date(y, m, d + 1).getTime();
    await database
      .ref("paymentCollections/")
      .orderByChild("collectionBy")
      .equalTo(value)
      .once("value")
      .then((snapshot) => {
        snapshot.val() &&
          snapshot.forEach((child) => {
            if (
              child.val().collectedOn >= firstDay &&
              child.val().collectedOn <= lastDay
            ) {
              count++;
              TodayAmount += parseFloat(child.val().amount);
            }
          });
        setEmployeeTodayCollection(count);
        setEmployeeTodayCollectionAmount(TodayAmount);
      });

    setLoader(false);
  };

  return loader ? (
    <div className="loaderContainer">
      <Loader active inline="centered" />
    </div>
  ) : (
    <div>
      <div className="home-head">
        <h4>Admin Dashboard</h4>
      </div>
      <div className="home-mainContainer">
        <div>
          Total Customers <span>{totalCustomer}</span>
        </div>
        <div>
          Total Employees <span>{totalEmployee}</span>
        </div>
        <div>
          Active Customers
          <span>
            {activeCustomer}/{totalCustomer}
          </span>
        </div>
        <div>
          InActive Customers <span>{inActiveCustomer}</span>
        </div>
        <div>
          Month Collection
          <span>
            {monthlyCollection}/{activeCustomer}
          </span>
        </div>
        <div>
          Today Collection <span>{todayCollection}</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
