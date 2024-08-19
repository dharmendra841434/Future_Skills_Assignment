import Card from "../models/card.model.js";

const createCards = async (req, res) => {
  try {
    //console.log(req?.body);

    const card = await Card.create(req?.body);

    res.status(201).send({
      status: true,
      message: "New card created successfully",
    });
  } catch (error) {
    res.status(error.status || 500).json({
      status: false,
      response: error.message || "Internal Server Error",
    });
  }
};

const getAllCards = async (req, res) => {
  try {
    const data = await Card.find();
    res.status(200).send({
      status: true,
      message: "Get all cards successfully",
      data: data,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      status: false,
      response: err.message || "Internal Server Error",
    });
  }
};
const searchCard = async (req, res) => {
  try {
    const { value } = req.params;

    const data = await Card.find();
    const searcheddata = data?.filter((item) =>
      item?.title?.toLocaleLowerCase()?.includes(value?.toLocaleLowerCase())
    );

    if (searcheddata?.length === 0) {
      return res.status(404).send({
        status: false,
        message: "Data not found",
      });
    }

    return res.status(200).send({
      status: true,
      message: "Get all cards successfully",
      data: searcheddata,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      status: false,
      response: err.message || "Internal Server Error",
    });
  }
};
export { createCards, getAllCards, searchCard };
