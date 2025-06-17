import { PerspectiveCamera, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import gsap from "gsap";
import Dialog from "./Dialog";

function ClawCamera({
  clawPos,
  setClawPos,
  isClawDown,
  setIsClawDown,
  setBearShow,
}) {
  const camRef = useRef();
  const [showDialog, setShowDialog] = useState(false);
  const [result, setResult] = useState(null);
  const [canMove, setCanMove] = useState(true);

  // 鍵盤控制器
  const [, getKeys] = useKeyboardControls();

  const speed = 0.05;
  const limitX = 0.3;
  const limitY = 0.4;

  useFrame(() => {
    const { forward, backward, left, right, jump } = getKeys(); //偵測按鈕狀態
    if (!isClawDown && canMove) {
      if (forward) {
        //box 往前
        if (clawPos.z > -limitY) {
          setClawPos({ x: clawPos.x, y: clawPos.y, z: clawPos.z - speed });
        }
      }
      if (backward) {
        //box 往後
        if (clawPos.z < limitY) {
          setClawPos({ x: clawPos.x, y: clawPos.y, z: clawPos.z + speed });
        }
      }
      if (right) {
        //box 往右
        if (clawPos.x < limitX) {
          setClawPos({ x: clawPos.x + speed, y: clawPos.y, z: clawPos.z });
        }
      }
      if (left) {
        //box 往左
        if (clawPos.x > -limitX) {
          setClawPos({ x: clawPos.x - speed, y: clawPos.y, z: clawPos.z });
        }
      }
      if (jump) {
        const getRandomInt = function (max) {
          return Math.floor(Math.random() * max);
        };
        const newResult = getRandomInt(4);
        setResult(newResult);
        setCanMove(false);
        console.log("結果", newResult);

        setIsClawDown(true);
        setBearShow(false);
        gsap.to(clawPos, {
          y: -0.7,
          duration: 3,
          onComplete: () => {
            setBearShow(newResult !== 3);
            gsap.to(clawPos, {
              y: 0.3,
              duration: 2,
              onComplete: () => {
                setIsClawDown(false);
                setShowDialog(true);
              },
            });
          },
        });
      }
    }

    if (camRef.current) {
      camRef.current.lookAt(0, 1, 0);
    }
  });

  const handleCloseDialog = () => {
    setShowDialog(false);
    setCanMove(true);
    setBearShow(false);
  };

  return (
    <>
      <PerspectiveCamera
        ref={camRef}
        makeDefault
        position={[0, 1, 5]} // 3 ~ 6
      />
      <Dialog
        result={result}
        isOpen={showDialog}
        onClose={handleCloseDialog}
      ></Dialog>
    </>
  );
}

export default ClawCamera;
