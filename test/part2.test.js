"use strict";
const supertest = require("supertest"),
  faker = require("faker"),
  fs = require("fs"),
  path = require("path"),
  lodash = require("lodash"),
  pathToRegexp = require("path-to-regexp"),
  app = require("../dist/part2/app").default,
  getRandomUser = () =>
    lodash.sample(
      JSON.parse(
        Buffer.from(
          require("../dist/part2/repository/userdata").default,
          "base64"
        ).toString()
      )
    );
describe("Part2", function () {
  context("readme", function () {
    var e = faker.lorem.paragraphs(2),
      t = faker.random.uuid() + ".txt",
      o = path.join(__dirname, "../files/readme", t);
    before(function () {
      fs.writeFileSync(o, e);
    }),
      after(function () {
        fs.unlink(o, function (e) {
          e && console.error(e);
        });
      }),
      it("should be able to read from file system", async function () {
        var o = (
          await supertest(app)
            .get("/files/" + t)
            .expect(200)
        ).body;
        o.filename.should.equal(t),
          o.length.should.equal(e.length),
          o.content.should.equal(e);
      }),
      it("should return 404 when file not found", async function () {
        (
          await supertest(app)
            .get("/files/some-thing-not-exist.txt")
            .expect(404)
        ).body.should.be.deep.equal({ error: "file not found!", code: 404 });
      });
  }),
    context("RESTful", function () {
      context("A", function () {
        it("should return a json array", async function () {
          var e = (await supertest(app).get("/users").expect(200)).body;
          e.should.be.an.instanceOf(Array), e.should.have.lengthOf(100);
        }),
          it("should return json with minimal data", async function () {
            var e = (await supertest(app).get("/users").expect(200)).body;
            e.should.be.an.instanceOf(Array),
              e.should.have.lengthOf.above(1),
              e.forEach(function (e) {
                e.should.have.property("_id"),
                  e.should.have.property("isActive"),
                  e.should.have.property("firstName"),
                  e.should.have.property("lastName"),
                  e.should.have.property("balance"),
                  e.should.not.have.property("age"),
                  e.should.not.have.property("eyeColor"),
                  e.should.not.have.property("company"),
                  e.should.not.have.property("email"),
                  e.should.not.have.property("phone"),
                  e.should.not.have.property("address"),
                  e.should.not.have.property("registered");
              });
          });
      }),
        context("B", function () {
          var e, t;
          before(function () {
            var o = listRoutes();
            (e = lodash.filter(o, function (e) {
              return /\/users\/.+/.test(e.path);
            })),
              (t = lodash.head(e));
          }),
            it("should have at least one API", function () {
              e.should.have.lengthOf.above(0);
            }),
            context("should met API spec", function () {
              var e = void 0,
                o = [1, 2, 3].map(function () {
                  return getRandomUser();
                });
              before(function () {
                var o = [];
                t.should.not.be.undefined,
                  pathToRegexp.pathToRegexp(t.path, o),
                  o.should.have.lengthOf.above(0),
                  (e = lodash.head(o).name);
              }),
                o.forEach(function (o) {
                  it("run on id:" + o._id, function () {
                    var r = {};
                    r[e] = o._id;
                    var a = pathToRegexp.compile(t.path)(r),
                      n = lodash.toLower(t.method);
                    return supertest(app)
                      [n](a)
                      .expect(200)
                      .then(function (e) {
                        e.body.should.be.deep.equal(o);
                      });
                  });
                });
            });
        });
    });
});
const listRoutes = (e, t, o) => (
  (o = o || ""),
  t
    ? (t.forEach(function (t) {
        if (t.route && t.route.path) {
          var r = "";
          for (r in t.route.methods)
            t.route.methods[r] &&
              e.push({ method: r.toUpperCase(), path: o + t.route.path });
        } else if (t.handle && "router" == t.handle.name) {
          var a = t.regexp.source
            .replace("^\\", "")
            .replace("\\/?(?=\\/|$)", "");
          return listRoutes(e, t.handle.stack, o + a);
        }
      }),
      e)
    : listRoutes([], app._router.stack)
);
