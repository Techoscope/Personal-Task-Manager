module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Album = mongoose.model("album", schema);
    return Album;
  };