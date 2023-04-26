import { log } from "console";
import { randomUUID } from "crypto";

export type TopicUploaded = {
  name: string;
  tests?: {
    id: string;
    questions: {
      id: string;
      question: string;
      options: {
        A: string;
        B: string;
        C: string;
        D: string;
      };
      answer: "A" | "B" | "C" | "D";
    }[];
  }[];
  questions: {
    id: string;
    question: string;
    options: {
      A: string;
      B: string;
      C: string;
      D: string;
    };
    answer: "A" | "B" | "C" | "D";
  }[];
};

export function validateTopicJson(
  topicData: TopicUploaded
): TopicUploaded["questions"] {
  const listQuestion: TopicUploaded["questions"] = [];
  if (!topicData?.name) {
    throw new Error("cannot read name of topic");
  }

  log(topicData);

  if (
    (!topicData?.tests || !Array.isArray(topicData.tests)) &&
    (!topicData?.questions || !Array.isArray(topicData.questions))
  ) {
    throw new Error("nothing to do");
  }

  if (topicData.tests && Array.isArray(topicData.tests)) {
    topicData.tests.forEach((item) => {
      if (item?.questions && Array.isArray(item.questions)) {
        item.questions.forEach((question) => {
          if (
            typeof question?.question === "string" &&
            typeof question.options.A === "string" &&
            typeof question.options.B === "string" &&
            typeof question.options.C === "string" &&
            typeof question.options.D === "string" &&
            typeof question.answer === "string" &&
            (question.answer === "A" ||
              question.answer === "B" ||
              question.answer === "C" ||
              question.answer === "D")
          ) {
            listQuestion.push({
              ...question,
              id: randomUUID(),
            });
          }
        });
      }
    });
  }

  if (topicData.questions && Array.isArray(topicData.questions)) {
    topicData.questions.forEach((question) => {
      if (
        typeof question?.question === "string" &&
        typeof question.options.A === "string" &&
        typeof question.options.B === "string" &&
        typeof question.options.C === "string" &&
        typeof question.options.D === "string" &&
        typeof question.answer === "string" &&
        (question.answer === "A" ||
          question.answer === "B" ||
          question.answer === "C" ||
          question.answer === "D")
      ) {
        listQuestion.push({
          ...question,
          id: randomUUID(),
        });
      }
    });
  }

  return listQuestion;
}
