'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useGLTF, useAnimations } from '@react-three/drei';

export default function Model(props) {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/Citizen 2.glb');
  const { actions, mixer } = useAnimations(animations, group);

  // idle
  useEffect(() => {
    actions['Armature|Idle']?.reset().play();
  }, [actions]);

  // 
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== ' ' && event.key !== 'Spacebar') return;
      event.preventDefault();

      const jump = actions['Armature|Jump'];
      const idle = actions['Armature|Idle'];
      if (!jump || jump.isRunning()) return;

      jump.reset();
      jump.setLoop(THREE.LoopOnce);
      jump.clampWhenFinished = true;
      idle?.crossFadeTo(jump, 0.1, true);
      jump.play();

      mixer.addEventListener('finished', function onFinish(e) {
        if (e.action !== jump) return;
        mixer.removeEventListener('finished', onFinish);
        jump.crossFadeTo(idle, 0.3, true);
        idle.play();
      });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [actions, mixer]);



  return <primitive ref={group} object={scene} {...props} />;
}
