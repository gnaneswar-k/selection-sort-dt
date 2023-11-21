import Layout from './layout'
import type { Metadata } from 'next'
import AgreeButton from './_components/buttons/agreeButton';
import Header from './_components/header/header';

export const metadata: Metadata = {
  title: 'Driving Test - Selection Sort',
  description: 'An Algodynamics Driving Test for selection sort',
};

const orgOfPOC = "International Institute of Information Technology, Hyderabad";
const nameOfPOC = "Gnaneswar K";
const emailOfPOC = "gnanu2004@gmail.com";
const mobileOfPOC = "+91 79894 73223";

export default function Home() {
  return (
    <Layout >
      <Header />
      <div className="flex flex-grow justify-center items-start overflow-y-auto">
        <div className="container flex-grow flex flex-col justify-evenly p-10 text-gray-900 px-24">
          <h1 className="text-2xl">Consent Form </h1>
          <h2 className="text-xl">Purpose of the research</h2>
          <p className="py-3">
            This activity is part of a research study conducted
            for algodynamics. The aim of the research is to
            <strong>&nbsp;explore understanding of the algorithm</strong>.
          </p>
          <h2 className="text-xl">Your Role in the research</h2>
          <p className="py-3">
            You will take an interactive game like test about an algorithm. No
            special preparation is required.
          </p>
          <h2 className="text-xl">Time Required</h2>
          <p className="py-3">The whole process might take around 15 minutes.</p>
          <h2 className="text-xl">Risks</h2>
          <p className="py-3">
            There is no risk for the participants. Participation in this survey is
            completely voluntary. You can withdraw your consent to participate at
            any time.
          </p>
          <h2 className="text-xl">Data Protection</h2>
          <p className="py-3">
            Your<strong>&nbsp;data will remain confidential&nbsp;</strong>and
            will be used for research purposes only. The research may result in
            scientific publications, conference and seminar presentations, and
            teaching. No Direct identifiers (ex: name, address, photo, video) will
            be collected as part of the survey.
          </p>
          {/* Update the point(s) of contact */}
          <h2 className="text-xl">Points of contact</h2>
          <ol className="py-2">
            <li>{nameOfPOC}, {orgOfPOC}
              <ol className="list-disc list-inside py-3">
                <li>Email: {emailOfPOC}</li>
                <li>Phone Number: {mobileOfPOC}</li>
              </ol>
            </li>
          </ol>
          <p className="py-3">
            Please click on the agree button below to start the test.
          </p>
          <AgreeButton />
        </div>
      </div>
    </Layout>
  )
};
