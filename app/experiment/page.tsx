"use client"

import Layout from "../layout"
import Header from "../_components/header/header"
import Instructions from "./instructions"
import Activity from "./activity"
import { useState } from "react"

export default function Experiment() {
  const [submit, setSubmit] = useState<boolean>(false);

  function handleSubmit (newSubmit: boolean) {
    setSubmit(newSubmit);
  };

  return (
    <Layout >
      <Header experiment toggleSubmit={setSubmit}/>
      {/* Experiment */}
      <div className="flex-grow flex overflow-hidden">
        {/* Information */}
        <div className="max-w-lg overflow-y-auto shadow-md p-6 text-lg">
          <Instructions />
        </div>
        {/* Activity */}
        <div className="w-full text-lg">
          <Activity showSubmit={submit} setShowSubmit={handleSubmit}/>
        </div>
      </div>
      {/* Copyright */}
      <div className="text-center p-2 border-black border-t-2">Copyright &copy; 2023 Algodynamics.</div>
    </Layout>
  )
};
