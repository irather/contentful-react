import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import "./styles/recalls.css";

function Recalls({ model, keyIndex }) {
  const [data, setData] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState([]);
  const [dialogSelectedTab, setDialogSelectedTab] = useState(0);
  const [language, setLanguage] = useState("en"); // Default language is English

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          language === "en" ? "https://healthycanadians.gc.ca/recall-alert-rappel-avis/api/recent/en" : "https://healthycanadians.gc.ca/recall-alert-rappel-avis/api/recent/fr"
        );
        setData(res.data.results);
      } catch (err) {
        console.log("Error fetching data: ", err);
      }
    };

    fetchData();
  }, [language]);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleOpenDialog = async (recall) => {
    try {
      const res = await axios.get(
        language === "en" ? `https://healthycanadians.gc.ca/recall-alert-rappel-avis${recall.url}/en` : `https://healthycanadians.gc.ca/recall-alert-rappel-avis${recall.url}/fr`
      );
      setDialogContent(res.data.panels);
      setOpenDialog(true);
    } catch (error) {
      console.error("Error fetching dialog data: ", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogContent([]);
  };

  const handleDialogTabChange = (event, newValue) => {
    setDialogSelectedTab(newValue);
  };

  const handleLanguageChange = (event, newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <Container key={keyIndex}>
      <ToggleButtonGroup value={language} exclusive onChange={handleLanguageChange} aria-label="Language Toggle">
        <ToggleButton value="en" aria-label="English">
          English
        </ToggleButton>
        <ToggleButton value="fr" aria-label="French">
          French
        </ToggleButton>
      </ToggleButtonGroup>
      <h2>{model.title}</h2>
      <Tabs value={selectedTab} onChange={handleChange} aria-label="Recall Categories">
        {Object.keys(data).map((category, index) => (
          <Tab key={index} label={category} />
        ))}
      </Tabs>
      {Object.entries(data).map(([category, recalls], index) => (
        <div key={index} style={{ display: selectedTab === index ? "block" : "none" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Recall ID</th>
                <th>Title</th>
                <th>Date Published</th>
              </tr>
            </thead>
            <tbody>
              {recalls.map((recall) => (
                <tr key={recall.recallId}>
                  <td className="recall-id" onClick={() => handleOpenDialog(recall)}>
                    {recall.recallId}
                  </td>
                  <td>{recall.title}</td>
                  <td>{new Date(recall.date_published * 1000).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>Recall Details</DialogTitle>
        <DialogContent>
          <Tabs value={dialogSelectedTab} onChange={handleDialogTabChange} aria-label="Recall Details">
            {dialogContent.map((panel, index) => (
              <Tab key={index} label={panel.title} />
            ))}
          </Tabs>
          {dialogContent.map((panel, index) => (
            <div key={index} style={{ display: dialogSelectedTab === index ? "block" : "none" }}>
              {panel.title === "Images" ? (
                <div>
                  {panel.data.map((image, idx) => (
                    <img key={idx} src={`https://healthycanadians.gc.ca${image.fullUrl}`} alt={image.title} />
                  ))}
                </div>
              ) : (
                <div>
                  <h3>{panel.title}</h3>
                  <div dangerouslySetInnerHTML={{ __html: panel.text }} />
                </div>
              )}
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Recalls;
