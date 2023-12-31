import React from "react";
import GortComparisonTable from "../../TestComparisons/GortComparison";
import OldCtoppComparison from "../../TestComparisons/OldCtoppComparison";
import SecondaryWistComparisonTable from "../../TestComparisons/SecondaryWistComparison";
import ElementaryWistComparisonTable from "../../TestComparisons/ElementaryWistComparison";
import YoungCtoppComparison from "../../TestComparisons/YoungCtoppComparison";

const CompareTab = () => {
  return (
    <div>
      <div className="h2-bold">GORT-5 TEST COMPARISON</div>
      <GortComparisonTable />
      <br />
      <div className="h2-bold">CTOPP-2 AGES 7-24 TEST COMPARISON</div>
      <OldCtoppComparison />
     <br /> <hr />
     <div className="h2-bold">CTOPP-2 AGES 4-6 TEST COMPARISON</div>
      <YoungCtoppComparison />
     <br /> <hr />
      <div className="h2-bold">WIST AGES 11-18 TEST COMPARISON</div>
      <SecondaryWistComparisonTable />
     <br /> <hr />

      <div className="h2-bold">WIST AGES 7-11 TEST COMPARISON</div>
      <ElementaryWistComparisonTable />
    </div>
    
  );
};

export default CompareTab;
