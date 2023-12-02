import { z } from "zod";

export const sendPushNotificatioSchema = z.object({
  token_push_notification: z.string({
    required_error: "Token push é obrigatório",
    invalid_type_error: "Token push é uma string",
  }),
  message: z.string({
    required_error: "Mensagem é obrigatória",
    invalid_type_error: "Mensagem é uma string",
  }),
});
