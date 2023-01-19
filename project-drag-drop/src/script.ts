import { Form, List } from "./factory/index.js";
import { Subject } from "./observers/index.js";
import { TaskModel } from "./models/index.js";

const subject = new Subject<TaskModel>();

new Form(subject);
new List('active', subject);
new List('finished', subject);
