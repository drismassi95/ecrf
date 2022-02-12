import React, { useEffect, useState } from "react";
import NavTop from "../components/NavTop";
import Title from "../components/PageTitle";
import ProfilePatient from "../components/ProfilePatient";
import styled from "styled-components";
import { firestore } from "../firebase/firebase.utils";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

export default function PatientInfos() {
  const [patient, setPatient] = useState(null);
  const param = useParams();
  const gettingPatient = async () => {
    const patientref = firestore
      .collection("medecins")
      .doc("mYC3a2aXzqcWbzILxg6HlEM346N2")
      .collection("patients")
      .doc(param.idpatient);
    const patientsnap = await patientref.get();
    setPatient({
      id: patientsnap.id,
      data: patientsnap.data(),
    });
    return patientref;
  };

  useEffect(() => {
    gettingPatient();
  }, []);

  return (
    <StyledDiv>
      <NavTop />
      <Title title="Profile patient" isStat="false" />
      {patient && (
        <ProfilePatient
          isAdminPage={false}
          data={patient}
          className="patientInfos"
        />
      )}
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  width: 80vw;
  height: 100vh;
`;