import "./AboutMe.css";

import MainHeading from "../MainHeading/MainHeading";
import Portfolio from "../Portfolio/Portfolio";

import StudentPhoto from "../../images/student-photo.jpg";

const AboutMe = () => {
  return (
    <section className="about-me">
      <MainHeading headingText="Студент" id="student" />
      <div className="about-me__wrapper">
        <div className="about-me__info">
          <div className="about-me__info-wrapper">
            <p className="about-me__info-name">Андрей</p>
            <p className="about-me__info-description">
              Фронтенд-разработчик, 27 лет
            </p>
            <p className="about-me__info-about">
              Выпускник кафедры АСУ ТП Московского Политехнического
              университета. На данный момент работаю в компании Gloria Jeans на
              должности Администратора корпоративных приложений (SimpleOne /
              SharePoint). В свободное время занимаюсь фотографией.
            </p>
          </div>
          <ul className="about-me__info-social-list">
            <li>
              <a
                className="about-me__info-social"
                href="https://vk.com/unt1tled_dream"
                target="_blank"
                rel="noreferrer"
              >
                Вконтакте
              </a>
            </li>
            <li>
              <a
                className="about-me__info-social"
                href="https://t.me/untitled_dream"
                target="_blank"
                rel="noreferrer"
              >
                Telegram
              </a>
            </li>
            <li>
              <a
                className="about-me__info-social"
                href="https://github.com/untitled-dream"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <img
          className="about-me__image"
          src={StudentPhoto}
          alt="Фотография. Смирнов Андрей"
        />
      </div>
      <Portfolio />
    </section>
  );
};

export default AboutMe;
