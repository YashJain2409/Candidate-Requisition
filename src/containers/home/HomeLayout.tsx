import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  TabProps,
  Box,
  Grid,
} from "@chakra-ui/react";
import React, { useState } from "react";
import InterviewSettingsForm from "./InterviewSettingsForm";
import JobDetailsForm from "./JobDetailsForm";
import RequisitionForm from "./RequisitionDetailsForm";
import DisplayCard from "./PreviewCard";
import { PageNumbers } from "../../interface/home";
import { IInterViewSettings, IJobDetails, IRequisitionDetails, IRequisitionDetailsValues } from "@src/interface/forms";

const CustomTab: React.FC<TabProps> = ({ children, ...props }) => {
  return (
    <Tab p="1rem" fontFamily="Poppins" {...props}>
      {children}
    </Tab>
  );
};

const HomeLayout = () => {
  const [requisitionDetails, setRequisitionDetails] =
    useState<IRequisitionDetails>({
      requisitionTitle: "",
      noOfOpenings: 0,
      urgency: "",
      gender: "",
    });

  const [jobDetails, setJobDetails] = useState<IJobDetails>({
    jobTitle: "",
    jobDetails: "",
    jobLocation: "",
  });

  const [interviewSettings, setInterviewSettings] = useState<IInterViewSettings>({
    interviewMode: "",
    interviewDuration: "",
    interviewLanguage: "",
  });

  const [page, setPage] = useState<PageNumbers>(0);

  const handlePage = (pageNumber: PageNumbers) => {
    setPage(pageNumber);
  };

  const getRequisitionDetails = (key: string, value: any) => {
    setRequisitionDetails((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const getJobDetails = (key: string, value: any) => {
    setJobDetails((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const getInterviewSettings = (key: string, value: any) => {
    setInterviewSettings((prev) => {
      return { ...prev, [key]: value };
    });
  };


  return (
    <Box w="100%">
      <Container maxW="1200px">
        <Heading fontFamily="Poppins" fontSize="1.5rem" my="2rem">
          Create Candidate Requisition
        </Heading>
        <Tabs index={page} isLazy lazyBehavior="keepMounted">
          <TabList>
            <CustomTab>Requistion Details</CustomTab>
            <CustomTab>Job Details</CustomTab>
            <CustomTab>Interview Settings</CustomTab>
          </TabList>
          <Grid display="grid" gridTemplateColumns="3fr 2fr" gap="24px">
            <TabPanels>
              <TabPanel>
                <RequisitionForm
                  handleTab={handlePage}
                  getRequisitionDetails={getRequisitionDetails}
                />
              </TabPanel>
              <TabPanel>
                <JobDetailsForm
                  handleTab={handlePage}
                  getJobDetails={getJobDetails}
                />
              </TabPanel>
              <TabPanel>
                <InterviewSettingsForm handleTab={handlePage} getInterviewSettings={getInterviewSettings}/>
              </TabPanel>
            </TabPanels>
            <DisplayCard
              requisitionDetails={requisitionDetails}
              jobDetails={jobDetails}
              interviewSettings={interviewSettings}
            />
          </Grid>
        </Tabs>
      </Container>
    </Box>
  );
};

export default HomeLayout;
