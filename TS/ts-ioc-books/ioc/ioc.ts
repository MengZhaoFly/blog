import { Container, injectable, inject } from "inversify";
import { interfaces, controller, httpGet, TYPE } from "inversify-koa-utils";
import * as Router from "koa-router";
import { provide, fluentProvide, buildProviderModule } from "inversify-binding-decorators";
import TAGS from "../constant/tags";

let provideThrowable = (identifier, name) => {
  return fluentProvide(identifier)
    .whenTargetNamed(name)
    .done();
}

export {
  buildProviderModule,
  provideThrowable,
  TAGS,
  TYPE,
  provide,
  Container,
  injectable,
  inject,
  Router,
  controller,
  interfaces,
  httpGet
}