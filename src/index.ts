import express from "express";
import { randomUUID } from "crypto";
import multer from "multer";
import { firestore } from "../firebase/config";
import { TopicUploaded, validateTopicJson } from "./validateTopicJson";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());

app.get("/api/topics/:topicId", async (req, res) => {
  const topicId = req.params["topicId"];
  res.json({
    data: (await firestore.collection("topics").doc(topicId).get()).data(),
  });
});

app.get("/api/topics", async (req, res) => {
  res.json({
    data: (await firestore.collection("topics").orderBy("name").get()).docs.map(
      (doc) => doc.data()
    ),
  });
});

app.post("/api/topics", async (req, res) => {
  const topic = req.body;

  if (!topic.name) {
    return res.status(400).json({
      message: "missing topic name",
    });
  }

  const topicExists = !(
    await firestore.collection("topics").where("name", "==", topic.name).get()
  ).empty;

  if (topicExists) {
    return res.status(400).json({
      message: "dupplicate topic name",
    });
  }

  const newTopic = {
    id: randomUUID(),
    name: topic.name,
  };

  await firestore.collection("topics").doc(newTopic.id).set(newTopic);

  res.json({
    data: newTopic,
  });
});

app.post(
  "/api/topics/:topicId/questions",
  async (req, res, next) => {
    upload.single("file")(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          message: "file field missing on request",
        });
      }
      next();
    });
  },
  async (req, res) => {
    const topicId = req.params["topicId"];
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "file field missing on request",
      });
    }

    if (file.mimetype != "application/json") {
      return res.status(400).json({
        message: "file not a json file",
      });
    }

    try {
      const topicData = JSON.parse(String(file.buffer));

      const questions = validateTopicJson(topicData);

      const topicDoc = await firestore.collection("topics").doc(topicId).get();

      if (!topicDoc.exists) {
        return res.status(400).json({
          message: "topic not found",
        });
      }

      const topicRef = firestore.collection(`topics/${topicId}/questions`);

      const batch = firestore.batch();

      questions.forEach((question: TopicUploaded["questions"][number]) => {
        var docRef = topicRef.doc(question.id);
        batch.set(docRef, question);
      });

      await batch.commit();

      res.json({
        data: "oke",
      });
    } catch (error) {
      return res.status(400).json({
        message: (error as Error).message,
      });
    }
  }
);

app.listen(4000, () => {
  console.log(`server running in http://localhost:4000`);
});
