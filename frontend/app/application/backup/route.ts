import { Database } from "sqlite";
import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/database/accecer";
import { HmacSHA256 } from "crypto-js";
import Base64 from "crypto-js/enc-base64";
import axios from "axios";

let db: Database;

export const POST = async (req: NextRequest) => {
  if (!db) {
    db = await getDB();
  }
  const body = (await req.json()) as { name: string; answer: string }[];

  const queryString = "INSERT INTO applicant (applicant_data) VALUES(?)";
  await db.run(queryString, JSON.stringify(body));

  await sendSms({
    name: body.find((value) => value.name === "name")?.answer ?? "",
    phone:
      body
        .find((value) => value.name === "contacted")
        ?.answer.split("-")
        .join("") ?? "",
  });

  // 이메일 보내는 요청이 프론트엔드와 백엔드 둘 다 이루어지고 있어서 이메일이 지원자에게 2번 전달되는 버그가 있어서 주석 처리
  // await sendEmail({
  //   applicantId:
  //     body.find((value) => value.name === "applicantId")?.answer ?? "",
  //   email: body.find((value) => value.name === "email")?.answer ?? "",
  // });

  return NextResponse.json({ success: true, response: null, error: null });
};

const sendSms = async ({ name, phone }: { name: string; phone: string }) => {
  const body = {
    type: "LMS",
    contentType: "COMM",
    countryCode: "82",
    from: "01030665016",
    content:
      "안녕하세요," +
      name +
      "님\n" +
      '2024년 2학기 에코노베이션 28기 신입회원 모집에 지원해주셔서 감사드립니다.\n한 번 제출하신 지원서는 수정이 불가능하며, 서류 합격 여부 및 면접 시간은 9월 20일 금요일에 안내될 예정입니다.\n더 궁금하신 내용은 카카오톡 채널 "에코노베이션"으로 문의 주시길 바랍니다.\n감사합니다.',
    messages: [
      {
        to: phone,
      },
    ],
  };

  const space = " "; //한 칸 공백
  const newLine = "\n"; //개행 문자
  const method = "POST";
  const serviceId = process.env.NCP_SMS_SERVICE_ID;
  const uri = `/sms/v2/services/${serviceId}/messages`;
  const timestamp = Date.now().toString();

  const accessKey = process.env.NCP_SMS_ACCESS_KEY ?? "";
  const secretKey = process.env.NCP_SMS_SECRET_KEY ?? "";
  const hmac = method + space + uri + newLine + timestamp + newLine + accessKey;

  const byteSignature = HmacSHA256(hmac, secretKey);
  const signature = Base64.stringify(byteSignature);

  const apiUrl = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;
  const response = await axios({
    method: "POST",
    url: apiUrl,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-ncp-apigw-timestamp": timestamp,
      "x-ncp-iam-access-key": accessKey,
      "x-ncp-apigw-signature-v2": signature,
    },
    data: body,
  }).catch((err) => {
    console.log(err);
  });
};

const sendEmail = async ({
  applicantId,
  email,
}: {
  applicantId: string;
  email: string;
}) => {
  await axios({
    url: process.env.NEXT_PUBLIC_API_URL + "/applicants/mail",
    method: "POST",
    data: { email, applicantId },
    headers: { "Content-Type": "application/json; charset=utf-8" },
  }).catch((err) => {
    console.log(err);
  });
};
