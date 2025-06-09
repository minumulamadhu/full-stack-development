import React from "react";
import UploadForm from "./components/UploadForm";
import ResultsPage from "./components/ResultsPage";
export default function App() {
  return (
    <div className="app">
      <h1> AI Image Recognition</h1>
      <UploadForm />
      <ResultsPage />
    </div>
  );
}
