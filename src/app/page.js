"use client";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import {
  RoundedBox,
  CameraControls,
  Environment,
  useGLTF,
  ContactShadows,
  PerspectiveCamera,
  axesHelper,
  KeyboardControls,
  useKeyboardControls,
  Box,
} from "@react-three/drei";

import ClawCamera from "@/component/ClawCamera";

import { Suspense, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";

// import Box from "@/component/Box";

function ClawModel({ clawPos, isClawDown }) {
  const clawModel = useGLTF("claw.glb");
  const clawRef = useRef();

  useFrame(() => {
    //不斷更新的 hook
    if (clawRef.current) {
      clawRef.current.traverse((child) => {
        if (child.name == "claw") {
          child.position.set(clawPos.x, clawPos.y + 2.85, clawPos.z);
        }

        if (child.name == "clawBase") {
          //爪底上下不動
          child.position.set(clawPos.x, 2.85, clawPos.z);
        }

        if (child.name == "track") {
          //只會前後
          child.position.set(0, 2.85, clawPos.z);
        }
      });
    }
  });

  return (
    <>
      <primitive
        ref={clawRef}
        object={clawModel.scene}
        scale={[0.6, 0.6, 0.6]}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      />
    </>
  );
}

export default function Home() {
  const isHidden = true;

  const [clawPos, setClawPos] = useState({ x: 0, y: 0, z: 0 });
  const [isClawDown, setIsClawDown] = useState(false);

  return (
    <div className="w-full h-screen">
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "w", "W"] },
          { name: "backward", keys: ["ArrowDown", "s", "S"] },
          { name: "left", keys: ["ArrowLeft", "a", "A"] },
          { name: "right", keys: ["ArrowRight", "d", "D"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        <Canvas>
          <ambientLight intensity={Math.PI / 2}></ambientLight>
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            decay={0}
            intensity={Math.PI}
          ></spotLight>

          {!isHidden && (
            <RoundedBox
              args={[1, 1, 1]} // Width, height, depth. Default is [1, 1, 1]
              radius={0.05} // Radius of the rounded corners. Default is 0.05
              smoothness={4} // The number of curve segments. Default is 4
              bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
              creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
            >
              <meshPhongMaterial color="#f3f3f3" />
            </RoundedBox>
          )}

          {/* <Box args={[1, 1, 1]}></Box> */}

          <Suspense fallback={null}>
            <ClawModel clawPos={clawPos} isClawDown={isClawDown} />
          </Suspense>

          <Environment
            background={true} // can be true, false or "only" (which only sets the background) (default: false)
            backgroundBlurriness={0.5} // optional blur factor between 0 and 1 (default: 0, only works with three 0.146 and up)
            backgroundIntensity={1} // optional intensity factor (default: 1, only works with three 0.163 and up)          backgroundRotation={[0, Math.PI / 2, 0]} // optional rotation (default: 0, only works with three 0.163 and up)
            environmentIntensity={1} // optional intensity factor (default: 1, only works with three 0.163 and up)
            preset={"city"}
          />
          <ContactShadows
            opacity={1}
            scale={10}
            blur={1}
            far={10}
            resolution={256}
            color="#dddddd"
          />
          <ClawCamera
            clawPos={clawPos}
            setClawPos={setClawPos}
            isClawDown={isClawDown}
            setIsClawDown={setIsClawDown}
          />
          <CameraControls />
          {/* 參考輔助線 */}
          {/* <axesHelper args={[10]} /> */}
        </Canvas>
      </KeyboardControls>
    </div>
  );
}
