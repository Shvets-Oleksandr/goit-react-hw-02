import { useState, useEffect } from "react";

import Description from "./components/description/Description";
import Options from "./components/options/Options";
import Feedback from "./components/feedback/Feedback";
import Notification from "./components/notification/Notification";

function App() {

  const [feedback, setFeedback] = useState(() => {
    const localFeedback = localStorage.getItem("saved-feedback");
    const parsedLocalFeedback = JSON.parse(localFeedback) ?? {
        good: 0,
        neutral: 0,
        bad: 0
      };

    return parsedLocalFeedback
  }
  );

  useEffect(() => {
    window.localStorage.setItem("saved-feedback", JSON.stringify(feedback))
  }, [feedback]);
  
  const resetFeedback = () => {
    setFeedback(
      {
        good: 0,
        neutral: 0,
        bad: 0
      }
    )
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

  const updateFeedback = (typeFeedback) => {
    setFeedback({ ...feedback, [typeFeedback]: feedback[typeFeedback] + 1 })
  };

  return (
    <div>
      <Description />

      <Options updateFeedback={updateFeedback} totalFeedback={totalFeedback} resetFeedback={resetFeedback} />

      <>
        {totalFeedback < 1 ? <Notification /> : <Feedback feedback={feedback} totalFeedback={totalFeedback} />}
      </>
    </div>
  );
}

export default App