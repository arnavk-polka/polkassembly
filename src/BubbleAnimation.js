import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { enqueueSnackbar } from 'notistack';
import './BubbleAnimation.css';

const BubbleAnimation = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);
  const featuredProductsRef = useRef(null);

  const scrollToFeaturedProducts = () => {
    featuredProductsRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleLearnMoreClick = (productName) => {
    enqueueSnackbar(`${productName} - Coming Soon! 🚀`, {
      variant: 'info',
      preventDuplicate: true,
      style: {
        fontFamily: '"Poppins", sans-serif',
        fontWeight: '500',
        fontSize: '14px',
      }
    });
  };

  useEffect(() => {
    const initScene = async () => {
      // Add FontAwesome CSS link
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css';
      document.head.appendChild(link);

      // Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      
      const camera = new THREE.PerspectiveCamera(
        25,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 24;

      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true
      });
      rendererRef.current = renderer;
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      // Import OrbitControls after THREE is available
      const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls');
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;

    const radii = [
      1, 0.6, 0.8, 0.4, 0.9, 0.7, 0.9, 0.3, 0.2, 0.5, 0.6, 0.4, 0.5, 0.6, 0.7, 0.3, 0.4, 0.8, 0.7, 0.5,
      0.4, 0.6, 0.35, 0.38, 0.9, 0.3, 0.6, 0.4, 0.2, 0.35, 0.5, 0.15, 0.2, 0.25, 0.4, 0.8, 0.76, 0.8, 1, 0.8,
      0.7, 0.8, 0.3, 0.5, 0.6, 0.55, 0.42, 0.75, 0.66, 0.6, 0.7, 0.5, 0.6, 0.35, 0.35, 0.35, 0.8, 0.6, 0.7, 0.8,
      0.4, 0.89, 0.3, 0.3, 0.6, 0.4, 0.2, 0.52, 0.5, 0.15, 0.2, 0.25, 0.4, 0.8, 0.76, 0.8, 1, 0.8, 0.7, 0.8,
      0.3, 0.5, 0.6, 0.8, 0.7, 0.75, 0.66, 0.6, 0.7, 0.5, 0.6, 0.35, 0.35, 0.35, 0.8, 0.6, 0.7, 0.8, 0.4, 0.89, 0.3
    ];

    const positions = [
      { x: 0, y: 0, z: 0 }, { x: 1.2, y: 0.9, z: -0.5 }, { x: 1.8, y: -0.3, z: 0 }, { x: -1, y: -1, z: 0 },
      { x: -1, y: 1.62, z: 0 }, { x: -1.65, y: 0, z: -0.4 }, { x: -2.13, y: -1.54, z: -0.4 }, { x: 0.8, y: 0.94, z: 0.3 },
      { x: 0.5, y: -1, z: 1.2 }, { x: -0.16, y: -1.2, z: 0.9 }, { x: 1.5, y: 1.2, z: 0.8 }, { x: 0.5, y: -1.58, z: 1.4 },
      { x: -1.5, y: 1, z: 1.15 }, { x: -1.5, y: -1.5, z: 0.99 }, { x: -1.5, y: -1.5, z: -1.9 }, { x: 1.85, y: 0.8, z: 0.05 },
      { x: 1.5, y: -1.2, z: -0.75 }, { x: 0.9, y: -1.62, z: 0.22 }, { x: 0.45, y: 2, z: 0.65 }, { x: 2.5, y: 1.22, z: -0.2 },
      { x: 2.35, y: 0.7, z: 0.55 }, { x: -1.8, y: -0.35, z: 0.85 }, { x: -1.02, y: 0.2, z: 0.9 }, { x: 0.2, y: 1, z: 1 },
      { x: -2.88, y: 0.7, z: 1 }, { x: -2, y: -0.95, z: 1.5 }, { x: -2.3, y: 2.4, z: -0.1 }, { x: -2.5, y: 1.9, z: 1.2 },
      { x: -1.8, y: 0.37, z: 1.2 }, { x: -2.4, y: 1.42, z: 0.05 }, { x: -2.72, y: -0.9, z: 1.1 }, { x: -1.8, y: -1.34, z: 1.67 },
      { x: -1.6, y: 1.66, z: 0.91 }, { x: -2.8, y: 1.58, z: 1.69 }, { x: -2.97, y: 2.3, z: 0.65 }, { x: 1.1, y: -0.2, z: -1.45 },
      { x: -4, y: 1.78, z: 0.38 }, { x: 0.12, y: 1.4, z: -1.29 }, { x: -1.64, y: 1.4, z: -1.79 }, { x: -3.5, y: -0.58, z: 0.1 },
      { x: -0.1, y: -1, z: -2 }, { x: -4.5, y: 0.55, z: -0.5 }, { x: -3.87, y: 0, z: 1 }, { x: -4.6, y: -0.1, z: 0.65 },
      { x: -3, y: 1.5, z: -0.7 }, { x: -0.5, y: 0.2, z: -1.5 }, { x: -1.3, y: -0.45, z: -1.5 }, { x: -3.35, y: 0.25, z: -1.5 },
      { x: -4.76, y: -1.26, z: 0.4 }, { x: -4.32, y: 0.85, z: 1.4 }, { x: -3.5, y: -1.82, z: 0.9 }, { x: -3.6, y: -0.6, z: 1.46 },
      { x: -4.55, y: -1.5, z: 1.63 }, { x: -3.8, y: -1.15, z: 2.1 }, { x: -2.9, y: -0.25, z: 1.86 }, { x: -2.2, y: -0.4, z: 1.86 },
      { x: -5.1, y: -0.24, z: 1.86 }, { x: -5.27, y: 1.24, z: 0.76 }, { x: -5.27, y: 2, z: -0.4 }, { x: -6.4, y: 0.4, z: 1 },
      { x: -5.15, y: 0.95, z: 2 }, { x: -6.2, y: 0.5, z: -0.8 }, { x: -4, y: 0.08, z: 1.8 }, { x: 2, y: -0.95, z: 1.5 },
      { x: 2.3, y: 2.4, z: -0.1 }, { x: 2.5, y: 1.9, z: 1.2 }, { x: 1.8, y: 0.37, z: 1.2 }, { x: 3.24, y: 0.6, z: 1.05 },
      { x: 2.72, y: -0.9, z: 1.1 }, { x: 1.8, y: -1.34, z: 1.67 }, { x: 1.6, y: 1.99, z: 0.91 }, { x: 2.8, y: 1.58, z: 1.69 },
      { x: 2.97, y: 2.3, z: 0.65 }, { x: -1.3, y: -0.2, z: -2.5 }, { x: 4, y: 1.78, z: 0.38 }, { x: 1.72, y: 1.4, z: -1.29 },
      { x: 2.5, y: -1.2, z: -2 }, { x: 3.5, y: -0.58, z: 0.1 }, { x: 0.1, y: 0.4, z: -2.42 }, { x: 4.5, y: 0.55, z: -0.5 },
      { x: 3.87, y: 0, z: 1 }, { x: 4.6, y: -0.1, z: 0.65 }, { x: 3, y: 1.5, z: -0.7 }, { x: 2.3, y: 0.6, z: -2.6 },
      { x: 4, y: 1.5, z: -1.6 }, { x: 3.35, y: 0.25, z: -1.5 }, { x: 4.76, y: -1.26, z: 0.4 }, { x: 4.32, y: 0.85, z: 1.4 },
      { x: 3.5, y: -1.82, z: 0.9 }, { x: 3.6, y: -0.6, z: 1.46 }, { x: 4.55, y: -1.5, z: 1.63 }, { x: 3.8, y: -1.15, z: 2.1 },
      { x: 2.9, y: -0.25, z: 1.86 }, { x: 2.2, y: -0.4, z: 1.86 }, { x: 5.1, y: -0.24, z: 1.86 }, { x: 5.27, y: 1.24, z: 0.76 },
      { x: 5.27, y: 2, z: -0.4 }, { x: 6.4, y: 0.4, z: 1 }, { x: 5.15, y: 0.95, z: 2 }, { x: 6.2, y: 0.5, z: -0.8 },
      { x: 4, y: 0.08, z: 1.8 }
    ];

    const material = new THREE.MeshLambertMaterial({
      color: "#e0a0a0",
      emissive: 0x331111
    });
    const group = new THREE.Group();
    const spheres = [];

    positions.forEach((pos, index) => {
      const radius = radii[index];
      const geometry = new THREE.SphereGeometry(radius, 64, 64);
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(pos.x, pos.y, pos.z);
      sphere.userData = { originalPosition: { ...pos }, radius };
      sphere.castShadow = true;
      sphere.receiveShadow = true;
      spheres.push(sphere);
      group.add(sphere);
    });

    scene.add(group);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 0.52);
    spotLight.position.set(14, 24, 30);
    spotLight.castShadow = true;
    scene.add(spotLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight1.position.set(0, -4, 0);
    scene.add(directionalLight1);

    // Animation variables
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const tempVector = new THREE.Vector3();
    const forces = new Map();

    const initY = -25;
    const revolutionRadius = 4;
    const revolutionDuration = 2;
    const breathingAmplitude = 0.1;
    const breathingSpeed = 0.002;

    // Initialize spheres below screen
    spheres.forEach((sphere, i) => {
      sphere.position.y = initY;
    });

    function initLoadingAnimation() {
      spheres.forEach((sphere, i) => {
        const delay = i * 0.02;

        gsap
          .timeline()
          .to(sphere.position, {
            duration: revolutionDuration / 2,
            y: revolutionRadius,
            ease: "power1.out",
            onUpdate: function () {
              const progress = this.progress();
              sphere.position.z =
                sphere.userData.originalPosition.z +
                Math.sin(progress * Math.PI) * revolutionRadius;
            },
            delay: delay
          })
          .to(sphere.position, {
            duration: revolutionDuration / 2,
            y: initY / 5,
            ease: "power1.out",
            onUpdate: function () {
              const progress = this.progress();
              sphere.position.z =
                sphere.userData.originalPosition.z -
                Math.sin(progress * Math.PI) * revolutionRadius;
            }
          })
          .to(sphere.position, {
            duration: 0.6,
            x: sphere.userData.originalPosition.x,
            y: sphere.userData.originalPosition.y,
            z: sphere.userData.originalPosition.z,
            ease: "power1.out"
          });
      });
    }

    // Load animation
    setTimeout(initLoadingAnimation, 100);

    // Find all elements with hide-text class
    const hiddenElements = document.querySelectorAll(".hide-text");
    const main_txt = document.querySelector(".main-txt");
    const mouse_effect = document.querySelector(".mouse-effect");

    // Initially ensure elements are hidden
    hiddenElements.forEach((el) => {
      el.style.opacity = "0";
    });

    // Disable mouse interaction during loading
    let loadingComplete = false;
    setTimeout(() => {
      loadingComplete = true;
      // Show hidden elements with fade in
      hiddenElements.forEach((el) => {
        el.style.opacity = "1";
      });
      main_txt.style.opacity = "0";
    }, (revolutionDuration + 1) * 1000);

    gsap.set(".circle", { xPercent: -50, yPercent: -50 });
    gsap.set(".circle-follow", { xPercent: -50, yPercent: -50 });

    let xTo = gsap.quickTo(".circle", "x", { duration: 0.6, ease: "power3" }),
        yTo = gsap.quickTo(".circle", "y", { duration: 0.6, ease: "power3" });

    let xFollow = gsap.quickTo(".circle-follow", "x", {
          duration: 0.6,
          ease: "power3"
        }),
        yFollow = gsap.quickTo(".circle-follow", "y", {
          duration: 0.6,
          ease: "power3"
        });

    // Mouse move handler
    function onMouseMove(event) {
      if (!loadingComplete) return;

      xTo(event.clientX);
      yTo(event.clientY);

      xFollow(event.clientX);
      yFollow(event.clientY);

      mouse_effect.style.opacity = "1";

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(spheres);

      if (intersects.length > 0) {
        const hoveredSphere = intersects[0].object;
        const force = new THREE.Vector3();
        force
          .subVectors(intersects[0].point, hoveredSphere.position)
          .normalize()
          .multiplyScalar(0.2);
        forces.set(hoveredSphere.uuid, force);
      }
    }

    // Collision detection
    function handleCollisions() {
      for (let i = 0; i < spheres.length; i++) {
        const sphereA = spheres[i];
        const radiusA = sphereA.userData.radius;

        for (let j = i + 1; j < spheres.length; j++) {
          const sphereB = spheres[j];
          const radiusB = sphereB.userData.radius;

          const distance = sphereA.position.distanceTo(sphereB.position);
          const minDistance = (radiusA + radiusB) * 1.2;

          if (distance < minDistance) {
            tempVector.subVectors(sphereB.position, sphereA.position);
            tempVector.normalize();

            const pushStrength = (minDistance - distance) * 0.4;
            sphereA.position.sub(tempVector.multiplyScalar(pushStrength));
            sphereB.position.add(tempVector.multiplyScalar(pushStrength));
          }
        }
      }
    }

    function animate() {
      animationIdRef.current = requestAnimationFrame(animate);

      if (loadingComplete) {
        const time = Date.now() * breathingSpeed;
        spheres.forEach((sphere, i) => {
          const offset = i * 0.2;
          const breathingY = Math.sin(time + offset) * breathingAmplitude;
          const breathingZ = Math.cos(time + offset) * breathingAmplitude * 0.5;

          const force = forces.get(sphere.uuid);
          if (force) {
            sphere.position.add(force);
            force.multiplyScalar(0.95);

            if (force.length() < 0.01) {
              forces.delete(sphere.uuid);
            }
          }

          const originalPos = sphere.userData.originalPosition;
          tempVector.set(
            originalPos.x,
            originalPos.y + breathingY,
            originalPos.z + breathingZ
          );
          sphere.position.lerp(tempVector, 0.018);
        });

        handleCollisions();
      }

      controls.update();
      renderer.render(scene, camera);
    }

    // Add event listener
    window.addEventListener("mousemove", onMouseMove);
    animate();

    // Add resize handler
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", handleResize);

      // Cleanup function
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", handleResize);
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
        if (rendererRef.current) {
          rendererRef.current.dispose();
        }
        if (link && document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    };

    initScene();
  }, []);

  return (
    <div>
      <div className="mouse-effect">
        <div className="circle"></div>
        <div className="circle-follow"></div>
      </div>

      <header className="hide-text">
        <div className="header-inner">
          <a href="#" className="navbar-brand">
            PITCHCRAFT
          </a>
                     
           
             <div className="middle-desc">
               <h2 onClick={scrollToFeaturedProducts} style={{cursor: 'pointer'}}>Featured Products</h2>
             </div>
          
        </div>
      </header>

      <h1 className="main-txt">PITCHCRAFT</h1>

      <section className="banner hide-text">
        <div className="banner-inner">
          <div className="top-desc">
            
          
          </div>
          <div className="bottom-desc">
            {/* <div className="left-desc">
              <h1>X</h1>
              <div className="desc-inner">
                <h5>Docs</h5>
                
              </div>
            </div> */}
            <div className="middle-desc">
              {/* <h2>Featured Products</h2> */}
            </div>
            <div className="right-desc">
              
             
            </div>
          </div>
        </div>
              </section>

        <section ref={featuredProductsRef} style={{
          minHeight: '100vh',
          padding: '80px 0',
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(10px)',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 40px'}}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '600',
              marginBottom: '50px',
              color: '#1a1a1a',
              fontFamily: '"Poppins", sans-serif',
              letterSpacing: '-0.5px'
            }}>Featured Products</h2>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '0'}}>
              
              {/* Elon Musk Bot */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '60px',
                gap: '60px'
              }}>
                <div style={{flex: 1, textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#1a1a1a',
                    fontFamily: '"Poppins", sans-serif',
                    textAlign: 'left'
                  }}>Elon Musk Bot</h3>
                  <p style={{
                    color: '#6b7280',
                    lineHeight: '1.5',
                    marginBottom: '20px',
                    fontSize: '15px',
                    maxWidth: '480px',
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: '400'
                  }}>
                    Engage with an AI simulation of Elon Musk, exploring his insights on technology, innovation, and the future.
                  </p>
                  <button 
                    onClick={() => handleLearnMoreClick('Elon Musk Bot')}
                    style={{
                    backgroundColor: '#f8fafc',
                    color: '#374151',
                    border: '1px solid #e5e7eb',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '13px',
                    fontFamily: '"Poppins", sans-serif',
                    transition: 'all 0.2s ease'
                  }}>Learn More</button>
                </div>
                <img 
                  src="/1.png" 
                  alt="Elon Musk Portrait"
                  style={{
                    width: '280px',
                    height: '200px',
                    borderRadius: '8px',
                    objectFit: 'cover'
                  }}
                />
              </div>

              {/* Investor Call Analyzer */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '60px',
                gap: '60px'
              }}>
                <div style={{flex: 1, textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#1a1a1a',
                    fontFamily: '"Poppins", sans-serif',
                    textAlign: 'left'
                  }}>Investor Call Analyzer</h3>
                  <p style={{
                    color: '#6b7280',
                    lineHeight: '1.5',
                    marginBottom: '20px',
                    fontSize: '15px',
                    maxWidth: '480px',
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: '400'
                  }}>
                    Analyze investor calls with AI, extracting key insights and trends to inform your investment strategies.
                  </p>
                  <button 
                    onClick={() => handleLearnMoreClick('Investor Call Analyzer')}
                    style={{
                    backgroundColor: '#f8fafc',
                    color: '#374151',
                    border: '1px solid #e5e7eb',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '13px',
                    fontFamily: '"Poppins", sans-serif',
                    transition: 'all 0.2s ease'
                  }}>Learn More</button>
                </div>
                <img 
                  src="/2.png" 
                  alt="Investor Call Analyzer"
                  style={{
                    width: '280px',
                    height: '200px',
                    borderRadius: '8px',
                    objectFit: 'cover'
                  }}
                />
              </div>

              {/* Keone Hon Bot */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '60px',
                gap: '60px'
              }}>
                <div style={{flex: 1, textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#1a1a1a',
                    fontFamily: '"Poppins", sans-serif',
                    textAlign: 'left'
                  }}>Keone Hon Bot</h3>
                  <p style={{
                    color: '#6b7280',
                    lineHeight: '1.5',
                    marginBottom: '20px',
                    fontSize: '15px',
                    maxWidth: '480px',
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: '400'
                  }}>
                    Interact with an AI model inspired by Keone Hon, gaining perspectives on entrepreneurship, marketing, and business growth.
                  </p>
                  <button 
                    onClick={() => handleLearnMoreClick('Keone Hon Bot')}
                    style={{
                    backgroundColor: '#f8fafc',
                    color: '#374151',
                    border: '1px solid #e5e7eb',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '13px',
                    fontFamily: '"Poppins", sans-serif',
                    transition: 'all 0.2s ease'
                  }}>Learn More</button>
                </div>
                <img 
                  src="/3.png" 
                  alt="Keone Hon Portrait"
                  style={{
                    width: '280px',
                    height: '200px',
                    borderRadius: '8px',
                    objectFit: 'cover'
                  }}
                />
              </div>

              {/* Rebecca Wen */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '60px',
                gap: '60px'
              }}>
                <div style={{flex: 1, textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#1a1a1a',
                    fontFamily: '"Poppins", sans-serif',
                    textAlign: 'left'
                  }}>Rebecca Wen</h3>
                  <p style={{
                    color: '#6b7280',
                    lineHeight: '1.5',
                    marginBottom: '20px',
                    fontSize: '15px',
                    maxWidth: '480px',
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: '400'
                  }}>
                    Simulate interactions with Rebecca Wen, a seasoned investor, to refine your pitches and understand investor expectations.
                  </p>
                  <button 
                    onClick={() => handleLearnMoreClick('Rebecca Wen')}
                    style={{
                    backgroundColor: '#f8fafc',
                    color: '#374151',
                    border: '1px solid #e5e7eb',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '13px',
                    fontFamily: '"Poppins", sans-serif',
                    transition: 'all 0.2s ease'
                  }}>Learn More</button>
                </div>
                <img 
                  src="/4.png" 
                  alt="Rebecca Wen Portrait"
                  style={{
                    width: '280px',
                    height: '200px',
                    borderRadius: '8px',
                    objectFit: 'cover'
                  }}
                />
              </div>

              {/* Gavin Wood Bot */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '60px',
                gap: '60px'
              }}>
                <div style={{flex: 1, textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#1a1a1a',
                    fontFamily: '"Poppins", sans-serif',
                    textAlign: 'left'
                  }}>Gavin Wood Bot</h3>
                  <p style={{
                    color: '#6b7280',
                    lineHeight: '1.5',
                    marginBottom: '20px',
                    fontSize: '15px',
                    maxWidth: '480px',
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: '400'
                  }}>
                    Explore the world of decentralized technologies with an AI representation of Gavin Wood, the visionary behind Polkadot.
                  </p>
                  <button 
                    onClick={() => handleLearnMoreClick('Gavin Wood Bot')}
                    style={{
                    backgroundColor: '#f8fafc',
                    color: '#374151',
                    border: '1px solid #e5e7eb',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '13px',
                    fontFamily: '"Poppins", sans-serif',
                    transition: 'all 0.2s ease'
                  }}>Learn More</button>
                </div>
                <img 
                  src="/5.png" 
                  alt="Gavin Wood Portrait"
                  style={{
                    width: '280px',
                    height: '200px',
                    borderRadius: '8px',
                    objectFit: 'cover'
                  }}
                />
              </div>

            </div>
          </div>
        </section>

        <canvas className="webgl" id="webgl" ref={canvasRef}></canvas>
    </div>
  );
};

export default BubbleAnimation;