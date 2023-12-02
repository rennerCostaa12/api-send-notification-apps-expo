import fastify from "fastify";

import { sendPushNotificatioSchema } from "./schemas";
import { sendPushNotification } from "./services";

const server = fastify();

server.get("/", () => {
  return "WELCOME TO THE JUNGLE!";
});

server.post("/sendPushNotification", async (req, res) => {
  try {
    const data = sendPushNotificatioSchema.parse(req.body);

    await sendPushNotification(data.token_push_notification, data.message);

    return res.status(200).send({
      status: true,
      message: "Notificação enviada com sucesso!",
    });
  } catch (error) {
    const messagesErrors = JSON.parse(error as any).map((value: any) => {
      return value.message;
    });

    res.status(400).send({
      status: false,
      message: "Erro ao enviar notificação",
      error: messagesErrors,
    });
  }
});

server.listen({ port: 4040 }, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});
