import './AboutProject.css';
import MainHeading from "../MainHeading/MainHeading";

const AboutProject = () => {
  return (
    <section className="about-project">
      <MainHeading headingText="О проекте" id="about-project" />
      <div className="about-project__wrapper">
        <ul className="about-project__list">
          <li className="about-project__list-item">
            <p className="about-project__title">
              Дипломный проект включал 5 этапов
            </p>
            <p className="about-project__description">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>
          <li className="about-project__list-item">
            <p className="about-project__title">
              На выполнение диплома ушло 5 недель
            </p>
            <p className="about-project__description">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <div className="about-project__timeline">
          <p className="about-project__timeline-chapter about-project__timeline-backend">
            1 неделя
          </p>
          <p className="about-project__timeline-chapter about-project__timeline-frontend">
            4 недели
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject