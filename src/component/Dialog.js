import React from "react";
import { Html } from "@react-three/drei";
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

function Dialog({ isOpen, onClose, result }) {
  if (!isOpen || result === null || result === undefined) return null;

  const resultInfo = getResultMessage(result);

  return (
    <Html fullscreen className="flex items-center justify-center">
      <div
        className="flex flex-col justify-center  p-6 rounded-xl w-[350px] h-[450px]"
        style={{ backgroundColor: resultInfo.bgColor }}
      >
        <h1
          className="text-2xl font-bold mb-4 justify-center text-center"
          style={{ color: resultInfo.color }}
        >
          {resultInfo.title}
        </h1>
        <Image
          src={resultInfo.img}
          alt="夾到的娃娃"
          width={160}
          height={160}
          className="mx-auto my-5 "
        />
        <p className="text-lg text-center whitespace-pre-line mb-4">
          {resultInfo.message}
        </p>

        <button
          className="text-center justify-center mt-4 px-4 py-2 text-white rounded cursor-pointer hover:opacity-80 transition-opacity"
          style={{ backgroundColor: resultInfo.color }}
          onClick={onClose}
        >
          再玩一次
        </button>
      </div>
    </Html>
  );
}

export default Dialog;
