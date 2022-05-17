import { useSelector } from "react-redux";

import Page from "../../Components/Ui/Wrapers/Page";
import Card from "../../Components/Ui/Wrapers/Card";
import StartingForm from "../../Components/Auth/StartingForm";

const StartingPage = () => {
  const { userId } = useSelector((state) => state.auth);

  return (
    <Page>
      <Card>
        <StartingForm userId={userId} />
      </Card>
    </Page>
  );
};

export default StartingPage;
