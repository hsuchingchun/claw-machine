import React from "react";
import Image from "next/image";
import { resultMessage } from "@/data/resultMessage";

const getResultMessage = (result) => {
  if (result >= 0 && result < resultMessage.length) {
    //結果多少給對應
    return resultMessage[result];
  }
  //沒中
  return resultMessage[3];
};

function ResultMessage({ result }) {
  if (result === null || result === undefined) return null;

  const resultInfo = getResultMessage(result);

  return (
    <>
      <div
        className="p-6 rounded-xl"
        style={{ backgroundColor: resultInfo.bgColor }}
      >
        <h2
          className="text-xl font-bold mb-4 justify-center text-center"
          style={{ color: resultInfo.color }}
        >
          {resultInfo.title}
        </h2>
        <Image
          src={resultInfo.img}
          alt="夾到的娃娃"
          width={160}
          height={160}
          className="mx-auto mb-4"
        />
        <p className="text-lg text-center">{resultInfo.message}</p>
      </div>
      <button
        className=" mt-4 px-4 py-2 text-white rounded"
        style={{ backgroundColor: resultInfo.color }}
        onClick={onClose}
      >
        再玩一次
      </button>
    </>
  );
}

export default ResultMessage;
