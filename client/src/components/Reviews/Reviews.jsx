import React from "react";
import style from "./Reviews.module.scss";
import { motion } from "framer-motion";
import {
  footerVariants,
  staggerChildren,
  textVariant,
  textVariant2,
} from "../../utils/motion";
import { comments, sliderSettings } from "../../utils/data";
import Slider from "react-slick";
const Reviews = () => {
  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      section
      className={`paddings ${style.wrapper}`}
    >
      <a className="anchor" id="reviews"></a>
      <motion.div
        variants={footerVariants}
        className={`yPaddings innerWidth ${style.container}`}
      >
        <div className={`flexCenter ${style.heading}`}>
          <span className="primaryText">Customer Reviews</span>
          <p style={{ marginTop: "2rem" }}>
            Our insurance packages offer comprehensive coverage options and
            competitive pricing
          </p>
          <p>
            Making us the top choice for influencers looking to protect their
            income and reputation
          </p>
        </div>

        <div className={`yPaddings ${style.comments}`}>
          {/* to use slider , we have to inlcude css in index.html head */}
          <Slider {...sliderSettings} className={style.slider}>
            {comments.map((comment, i) => {
              return (
                <div key={i} className={`flexCenter ${style.comment}`}>
                  <img src={comment.img} alt="" />
                  <p>{comment.comment}</p>
                  <div className={style.line}></div>
                  <div className={style.bio}>
                    <span>{comment.name}</span>
                    <span>{comment.post}</span>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Reviews;
