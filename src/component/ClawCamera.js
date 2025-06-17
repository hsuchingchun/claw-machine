import { PerspectiveCamera, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import gsap from "gsap";

function ClawCamera({ clawPos, setClawPos, isClawDown, setIsClawDown }) {
  const camRef = useRef();

  // 鍵盤控制器
  const [, getKeys] = useKeyboardControls();

  const speed = 0.05;
  const limitX = 0.3;
  const limitY = 0.4;

  useFrame(() => {
    const { forward, backward, left, right, jump } = getKeys(); //偵測按鈕狀態
    if (!isClawDown) {
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
        //隨機判斷是否中獎

        const random = Math.random();
        const isWin = random < 0.5;

        const getRandomInt = function (max) {
          return Math.floor(Math.random() * max);
        };

        console.log("結果", getRandomInt(4));

        setIsClawDown(true);
        gsap.to(clawPos, {
          y: -0.7,
          duration: 3,
          onComplete: () => {
            gsap.to(clawPos, {
              y: 0.3,
              duration: 2,
              onComplete: () => {
                setIsClawDown(false);
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
  return (
    <>
      <PerspectiveCamera
        ref={camRef}
        makeDefault
        position={[0, 1, 3]} // 3 ~ 6
      />
    </>
  );
}

export default ClawCamera;
