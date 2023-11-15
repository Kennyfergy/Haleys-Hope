import React from "react";
import ElementaryWistList from "../../WistList/ElementaryWistList";
import SecondaryWistList from "../../WistList/SecondaryWistList";
import KteaList from "../../KteaList/KteaList";
import GortList from "../../GortList/GortList";

const TestTab = () => {
  return (
    <div>
      <div>TestTab</div>
      <ElementaryWistList />
      <SecondaryWistList />
      <GortList />
      <KteaList />
    </div>
  );
};

export default TestTab;
