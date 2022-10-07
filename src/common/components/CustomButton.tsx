import React, { MouseEventHandler, useState } from "react";
import { IconProps } from "phosphor-react";
import styled from "styled-components";

interface CustomButtonProps {
  callback: () => any;
  ids?: string[];
  phosphorIcon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  color: string;
}

const DeleteButton = ({
  ids,
  callback,
  phosphorIcon: Icon,
  color,
}: CustomButtonProps) => {
  const [hovering, setHovering] = useState(false);
  return (
    <Container color={color}>
      <Icon
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        weight={hovering ? "fill" : "regular"}
        onClick={callback}
        size={20}
      />
      {/* Optional prop, used for rendering number of selected */}
      {ids && <p>{ids.length}</p>}
    </Container>
  );
};

const Container = styled.div`
  svg {
    color: ${(props) => props.color};
    transition: all 0.17s ease;
    :hover {
      transform: scale(1.15);
    }
  }
`;

export default DeleteButton;
