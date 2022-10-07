import React from "react";
import { ReactSVG } from "react-svg";
import { useSelector } from "../../app/hooks";
import SvgBig from "../../../public/hero.svg";
import SvgSmall from "../../../public/hero-small.svg";
import styled from "styled-components";
import useWindowDimensions from "../../common/hooks/useWindowDimensions";
import currency from "currency.js";
const Header = () => {
  const { width } = useWindowDimensions();
  const { expenseSum } = useSelector((state) => state.expense.info);
  const displayName = useSelector((state) => state.auth.user.displayName);

  return (
    <div>
      {displayName && (
        <WelcomeText>Welcome, {displayName.split(" ")[0]}</WelcomeText>
      )}
      <Total>{`${currency(expenseSum).format()}`}</Total>
      <HeroImage>
        {width > 800 ? <ReactSVG src={SvgBig} /> : <ReactSVG src={SvgSmall} />}
      </HeroImage>
    </div>
  );
};

const HeroImage = styled.div``;

const H1 = styled.h1`
  width: 100%;
  position: absolute;
  color: white;
  text-align: center;
  pointer-events: none;
`;

const WelcomeText = styled(H1)`
  pointer-events: none;
  font-size: 300%;
  padding-top: 7%;
  font-weight: 200;

  @media (max-width: 768px) {
    font-size: 200%;
    padding-top: 15%;
  }
`;

const Total = styled(H1)`
  font-size: 350%;
  padding-top: 15%;
  font-weight: 200;

  @media (max-width: 768px) {
    font-size: 300%;
    padding-top: 35%;
  }
`;

export default Header;
