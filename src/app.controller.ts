import { Body, Controller, Get, Headers, Post } from "@nestjs/common";
import { request } from "http";

@Controller("")
export class AppController {
  @Post()
  getHello(@Headers() headers, @Body() body): string {
    console.log(headers, body);
    return "Hello World!";
  }
}
