import express, { Router } from "express";
import { Usercreatecontroller } from "./Controllers/UserCreateController";
import { SessionCreateController } from "./Controllers/SessionCreateController";
import { CortesController } from "./Controllers/CortesController";
import { ClientesAtendidosController } from "./Controllers/ClientesAtendidosController";
import { SubscribeController } from "./Controllers/Payment/paymentController";
import { WebhooksController } from "./Controllers/Payment/Webhooks";
import { CancelSignatureController } from "./Controllers/Payment/CancelSubscriber";
const route = Router();


route.post("/users", new Usercreatecontroller().handle);
route.get("/users", new Usercreatecontroller().findAll);
route.get("/usersfindunique", new Usercreatecontroller().findunique);
route.put("/updateuser/:id", new Usercreatecontroller().update);
route.put("/uppass/:id", new Usercreatecontroller().updatepassword);
route.post("/session", new SessionCreateController().create);
route.delete("/session/:id", new SessionCreateController().del);
route.get("/sessionFindAll", new SessionCreateController().findAll);
route.get("/sessionFindUnique", new SessionCreateController().findUnique);
route.post("/cortes", new CortesController().create);
route.get("/corte", new CortesController().findUnique);
route.get("/nomecorte", new CortesController().resolverField);
route.get("/cortes", new CortesController().findAll);
route.put("/cortes/:id", new CortesController().update);
route.delete("/cortes/:id", new CortesController().del);
route.post("/clients", new ClientesAtendidosController().create);
route.get("/client", new ClientesAtendidosController().findUnique);
route.get("/clients", new ClientesAtendidosController().findAll);
route.get("/clientsperdata", new ClientesAtendidosController().finddate);
route.put("/clients/:id", new ClientesAtendidosController().update);
route.delete("/clients/:id", new ClientesAtendidosController().del);

route.post("/payment", new SubscribeController().handle);
route.post("/cancelSignature", new CancelSignatureController().cancel);
route.post("/webhook", express.raw({ type: "application/json" }), new WebhooksController().handle);

export default route;
