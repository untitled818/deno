import { serve } from "https://deno.land/std@0.155.0/http/server.ts";
import * as mod from "https://deno.land/std@0.164.0/http/mod.ts";

serve(async (req: Request) => {
  try {
    const sign = req.headers.get("expo-signature");

    if (sign) {
      const reqJson = await req.json();

      console.log("----",reqJson)

      const platform = reqJson.platform
      let downloadLink = reqJson.artifacts.buildUrl
      const username = reqJson.metadata.username
      const commitMsg = reqJson.metadata.gitCommitMessage
      const message = reqJson.metadata.message ?? "-"
      const profile = "编译环境: " + reqJson.metadata.buildProfile
      const version = reqJson.metadata.appVersion

    if (platform === "ios") {
      downloadLink = "https://expo.dev/accounts/hundredth6819/projects/dcs-cards/builds/" + reqJson.id
    }

      let msg = {
        msg_type: "interactive",
        card: {
          config: { wide_screen_mode: false, enable_forward: true },
          elements: [
            { tag: "div", text: { content: profile, tag: "lark_md" } },
            { tag: "div", text: { content: "version:" + version, tag: "lark_md" } },
            { tag: "div", text: { content: "commit:" + commitMsg, tag: "lark_md" } },
            { tag: "div", text: { content: "remark:" + message, tag: "lark_md" } },
              {
                tag: "div",
                text: {
                  content: "构建人: "+ username,
                  tag: "lark_md",
                },
              },
            {
              actions: [
                {
                  tag: "button",
                  text: { content: "下载", tag: "lark_md" },
                  url: downloadLink,
                  type: "default",
                  value: {},
                },
              ],
              tag: "action",
            },
          ],
          header: {
            title: { content: platform + " 构建成功", tag: "plain_text" },
            template: "green",
          },
        },
      };
        console.log(reqJson.error)
      if (reqJson.status == "errored" && reqJson.error) {
        msg = {
          msg_type: "interactive",
          card: {
            config: {
              wide_screen_mode: false,
              enable_forward: true,
            },
            elements: [

            { tag: "div", text: { content: profile, tag: "lark_md" } },
            { tag: "div", text: { content: "version:" + version, tag: "lark_md" } }, 
            { tag: "div", text: { content: "commit:" + commitMsg, tag: "lark_md" } },
            { tag: "div", text: { content: "remark:" + message, tag: "lark_md" } },
              {
                tag: "div",
                text: {
                  content: reqJson.error.errorCode + ": " + reqJson.error.message,
                  tag: "lark_md",
                },
              },
               {
                tag: "div",
                text: {
                  content: "构建人: "+ username,
                  tag: "lark_md",
                },
              },
            ],
            header: {
              title: {
                content: platform + " 构建失败",
                tag: "plain_text",
              },
              template: "red",
            },
          },
        };
      }

    const larkRet =  await fetch(
        "https://open.larksuite.com/open-apis/bot/v2/hook/266c03ac-5b05-492a-9bfa-ed8b08f130f3",
        {
          method: "POST",
          body: JSON.stringify(msg),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      return new Response("Notificaiton sended");
    }
  } catch (e) {
    console.log("error: ", e);
    return new Response("Hello World");
  }

  return new Response("Hello World");
});
