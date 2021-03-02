import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import MenuBar from "../../components/menubar";
import SideBar from "../../components/sidebar";
import axios from "axios";
import "./index.scss";
import PlanData from "../../components/planData";
import { baseURL } from "../../config.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, database } from "../../config/firebase";

const Plan = () => {
  const [companyList, setCompanyList] = useState(null);
  const [filteredCompanyList, setFilteredCompanyList] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [searchBy, setSearchBy] = useState("phone");
  const [loader, setLoader] = useState(false);
  const setCompany = (company) => {
    setOpen(true);
    setSelectedCompany(company);
  };
  const search = (e) => {
    if (e.code === "Enter" && searchValue.length > 0) {
      var temp = [];

      setLoader(true);
      database
        .ref("customers/")
        .orderByChild(searchBy)
        .startAt(searchValue)
        .endAt(searchValue + "\uf8ff")
        .once("value")
        .then((snapshot) => {
          if (snapshot.val()) {
            snapshot.forEach((childSnapshot) => {
              temp.push({ id: childSnapshot.key, ...childSnapshot.val() });
            });
            if (searchBy === "name") {
              database
                .ref("customers/")
                .orderByChild(searchBy)
                .startAt(searchValue.toUpperCase())
                .endAt(searchValue.toUpperCase() + "\uf8ff")
                .once("value")
                .then((snapshot) => {
                  if (snapshot.val()) {
                    snapshot.forEach((childSnapshot) => {
                      temp.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val(),
                      });
                    });
                  }
                  setLoader(false);
                  setFilteredCompanyList(temp);
                });
            } else {
              setLoader(false);
              setFilteredCompanyList(temp);
            }
          } else {
            database
              .ref("customers/")
              .orderByChild(searchBy)
              .startAt(searchValue.toUpperCase())
              .endAt(searchValue.toUpperCase() + "\uf8ff")
              .once("value")
              .then((snapshot) => {
                if (snapshot.val()) {
                  snapshot.forEach((childSnapshot) => {
                    temp.push({
                      id: childSnapshot.key,
                      ...childSnapshot.val(),
                    });
                  });
                  setLoader(false);
                  setFilteredCompanyList(temp);
                } else {
                  setSearchValue("");
                  setLoader(false);
                }
              });
          }
        });
    } else {
      setLoader(false);
    }
  };
  const searchCompany = (e) => {
    if (e.code === "Enter" && searchValue.length !== 0) {
      var filteredDataName = companyList.filter((cmp) => {
        return cmp.CompanyName.toLowerCase().includes(searchValue);
      });
      var filteredDataId = companyList.filter((cmp) => {
        return cmp.companyId === Number(searchValue);
      });
      setFilteredCompanyList([...filteredDataName, ...filteredDataId]);
    } else if (e.code === "Enter" && searchValue.length === 0) {
      setFilteredCompanyList(companyList);
    }
  };
  const clearSearch = () => {
    setSearchValue("");
    setFilteredCompanyList(companyList);
  };
  useEffect(() => {
    setLoader(true);
    getCustomerList();
  }, []);
  const getCustomerList = () => {
    let temp = [];
    database
      .ref("customers/")
      .orderByChild("name")
      .once("value")
      .then((snapshot) => {
        snapshot.val() &&
          snapshot.forEach((childSnapshot) => {
            temp.push({ id: childSnapshot.key, ...childSnapshot.val() });
          });
        setCompanyList(temp);
        setFilteredCompanyList(temp);
        setLoader(false);
      });
  };
  console.log(companyList);
  return (
    <div>
      <Header />
      <MenuBar activeItem="customer" />
      <div className="main">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="sidebarMain">
          <SideBar
            clearSearch={clearSearch}
            setCompany={setCompany}
            setSearchValue={setSearchValue}
            searchCompany={search}
            companyList={filteredCompanyList}
            searchValue={searchValue}
          />
        </div>
        <div className="data">
          {open && (
            <PlanData
              open={open}
              setOpen={setOpen}
              selectedCompany={selectedCompany}
              getCustomerList={getCustomerList}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Plan;
