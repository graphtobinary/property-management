import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

import { CONFIG } from 'src/config-global';

import { CreateListStep1 } from 'src/sections/createList/view';
import { CreateListStep2 } from 'src/sections/createList/view/create-list-step2';
import { CreateListStep3 } from 'src/sections/createList/view/create-list-step3';

// ----------------------------------------------------------------------

export default function Page() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <>
      <Helmet>
        <title>{`Create Listing - ${CONFIG.appName}`}</title>
      </Helmet>

      {currentStep === 1 && <CreateListStep1 onNext={handleNextStep} />}
      {currentStep === 2 && <CreateListStep2 onBack={handlePreviousStep} onNext={handleNextStep} />}
      {currentStep === 3 && <CreateListStep3 onBack={handlePreviousStep} onNext={handleNextStep} />}
    </>
  );
}
